const ConsumptionControl = require('./../models/consumptionControlModel');
const ProductionsDetails = require('./../models/productionsDetailsModel');
const MaterialDetail = require('./../models/materialDetailsModel')




exports.contradiction= async (req, res) => {
    try {
        const { reportId } = req.params;
        if (!reportId) {
            return res.status(400).json({
                success: false,
                message: "Report ID is required",
            });
        }
        // let { user } = req
        // let { activeReport } = user
        // if(!activeReport){
        //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        // }

        const consumptionControl = await ConsumptionControl.find({ reportId  }).lean();
        const productions = await ProductionsDetails.find({ reportId  }).lean();
        const materialDetails = await MaterialDetail.findOne({ reportId  }).lean();
        console.log('LEAN',materialDetails);
        console.log('NORMAL',await MaterialDetail.findOne({ reportId  }).lean());
        
        

        if (!consumptionControl || !productions || !materialDetails) {
            return res.status(404).json({
                success: false,
                message: "There is no data with that reportId or your reportId is invalid",
            });
        }

        const productionMap = {};
        productions.forEach((doc) => {
            doc.items.forEach((item) => {
                if (!productionMap[item.productCode]) {
                    productionMap[item.productCode] = {
                        productName: item.productName,
                        productionQuantity: 0,
                    };
                }
                productionMap[item.productCode].productionQuantity += item.productionQuantity;
            });
        });

        const materialMap = {};
        materialDetails.items.forEach((item) => {
            if (!materialMap[item.productCode]) {
                materialMap[item.productCode] = {
                    productName: item.productName,
                    consumptionAmount: 0,
                };
            }
            materialMap[item.productCode].consumptionAmount += item.consumptionAmount;
        });

        const discrepanciesMap = {};
        consumptionControl.forEach((doc) => {
            doc.items.forEach((product) => {
                if (productionMap[product.productCode]) {
                    product.materialItems.forEach((material) => {
                        let ConsumableQuantity = material.coefficient * productionMap[product.productCode].productionQuantity;
                        console.log('111', ConsumableQuantity);
                        
                        let OriginalConsumableQuantity = ConsumableQuantity; 
                        console.log('2222', OriginalConsumableQuantity);
                        
                        const matchingMaterial = materialMap[material.materialCode];
                        if (matchingMaterial) {
                            ConsumableQuantity -= matchingMaterial.consumptionAmount;
                        }

                        const key = `${product.productCode}-${material.materialCode}`;
                        if (!discrepanciesMap[key]) {
                            discrepanciesMap[key] = {
                                productCode: product.productCode,
                                productName: product.productName,
                                materialCode: material.materialCode,
                                OriginalConsumableQuantity: 0,
                                ConsumableQuantity: 0,
                            };
                        }
                        discrepanciesMap[key].OriginalConsumableQuantity += OriginalConsumableQuantity;
                        discrepanciesMap[key].ConsumableQuantity += ConsumableQuantity;
                    });
                }
            });
        });

        const discrepancies = Object.values(discrepanciesMap);
        
        res.status(200).json({
            success: true,
            reportId ,
            data: discrepancies,
        });
    } catch (err) {
        console.error("Error finding discrepancies:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
