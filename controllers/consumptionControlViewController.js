const ConsumptionControl = require('./../models/consumptionControlModel');
const ProductionsDetails = require('./../models/productionsDetailsModel');
  



const getconsuptionControlView = async (req, res) => {
    try {
        // const { reportId } = req.params;
        // if (!reportId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Report ID is required",
        //     });
        // }

               let { user } = req
                let { activeReport } = user
                if(!activeReport){
                    return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
                }

        const consumptionControl = await ConsumptionControl.find({ reportId : activeReport }).lean();
        const productions = await ProductionsDetails.find({ reportId : activeReport }).lean();

        if (!consumptionControl || !productions) {
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

        const discrepancies = [];
        consumptionControl.forEach((doc) => {
            doc.items.forEach((product) => {
                if (productionMap[product.productCode]) {
                    product.materialItems.forEach((material) => {
                        const ConsumableQuantity = material.coefficient * productionMap[product.productCode].productionQuantity;
                        discrepancies.push({
                            productCode: product.productCode,
                            productName: product.productName,
                            productionQuantity: productionMap[product.productCode].productionQuantity,
                            materialCode: material.materialCode,
                            materialName: material.materialName,
                            unit: material.unit,
                            coefficient: material.coefficient,
                            ConsumableQuantity,
                        });
                    });
                }
            });
        });

        res.status(200).json({
            success: true,
            reportId : activeReport,
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

module.exports = { getconsuptionControlView };
