const warehouseModel = require('./../models/WarehouseModel');
const ProductionsDetails = require('./../models/productionsDetailsModel');
  
  const getProductionDiscrepancies = async (req, res) => {
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
  

        const warehouse = await warehouseModel.find({ reportId  }).lean();
        const productions = await ProductionsDetails.find({ reportId }).lean();
        
if (!warehouse || !productions) {
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

const warehouseMap = {};
warehouse.forEach((doc) => {
  doc.items.forEach((item) => {
    if (!warehouseMap[item.productCode]) {
      warehouseMap[item.productCode] = {
        consumptionNumber: 0,
      };
    }
    warehouseMap[item.productCode].consumptionNumber += item.consumptionNumber;
  });
});


const discrepancies = [];
for (const productCode in warehouseMap) {
  if (productionMap[productCode]) {
    const discrepancy =
      warehouseMap[productCode].consumptionNumber - productionMap[productCode].productionQuantity;

    discrepancies.push({
      productCode,
      productName: productionMap[productCode].productName,
      consumptionNumber: warehouseMap[productCode].consumptionNumber,
      productionQuantity: productionMap[productCode].productionQuantity,
      discrepancy,
    });
  }
}

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
  
  module.exports = { getProductionDiscrepancies };

  
// const warehouseModel = require('./../models/WarehouseModel');
// const ProductionsDetails = require('./../models/productionsDetailsModel');


// exports.getMaterialDiscrepancies = async (req, res) => {
//     try {
//       const { reportId } = req.params;
//       if (!reportId) {
//         return res.status(400).json({
//           success: false,
//           message: "Report ID is required",
//         });
//       }

//       const materilCountings = await warehouseModel.find({ reportId }).lean();
//       const productionDetails = await ProductionsDetails.find({ reportId }).lean();

      
//       if (!materilCountings || !materialDetails) {
//         return res.status(404).json({
//           success: false,
//           message: "There is no data with that reportId or your reportId is invalid",
//         });
//       }

//       const productionMap = {};
//       productionDetails.forEach((doc) => {
//         doc.items.forEach((item) => {
//           if (!productionMap[item.productCode]) {
//             productionMap[item.productCode] = {
//               materialName: item.materialName,
//               materialCounting : 0,
              
//             };
//           }
//           productionMap[item.productCode].materialCounting += item.materialCounting;
        
          
//         });
//       });

//       const materialDetailsMap = {};
//       materialDetails.forEach((doc) => {
//         doc.items.forEach((item) => {
//           if (!materialDetailsMap[item.productCode]) {
//             materialDetailsMap[item.productCode] = {
//               consumptionNumber: 0,
//               endAmount:  0, 
//              endNumber: 0,
//             };
//           }
         
//           materialDetailsMap[item.productCode].endAmount += item.endAmount ;
//           materialDetailsMap[item.productCode].endNumber += item.endNumber ;
//           console.log('11111',materialDetailsMap[item.productCode].endNumber );
//           console.log('222', materialDetailsMap[item.productCode].endAmount );
          
       
          
//         });
//       });

//       const discrepancies = [];
//       for (const materialCode in productionMap) {
//         const productCode = Object.keys(materialDetailsMap).find((productCode) => productCode === materialCode);
       
        
        
//         if (productCode) {
//             const endNumber = materialDetailsMap[productCode].endNumber || 0; 
//           const discrepancy =
          
//           productionMap[materialCode].materialCounting - endNumber;
//           const rate = materialDetailsMap[productCode].endNumber !== 0 ?
//             materialDetailsMap[productCode].endAmount / materialDetailsMap[productCode].endNumber : 0;
//           const discrepancyAmount = rate * discrepancy;

//           discrepancies.push({
//             materialCode,
//             materialName: productionMap[materialCode].materialName,
//             materialCounting: productionMap[materialCode].materialCounting,
//             endNumber : materialDetailsMap[productCode].endNumber,
//             discrepancy,
//             rate,
//             discrepancyAmount,
//           });
//         }
//       }

//       res.status(200).json({
//         success: true,
//         reportId,
//         data: discrepancies,
//       });
//     } catch (err) {
//       console.error("Error finding discrepancies:", err);
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
// };
