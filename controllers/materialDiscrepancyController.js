const materilCountingsModel = require('./../models/materialCountingModel');
const materialDetailsModel = require('./../models/materialDetailsModel');


exports.getMaterialDiscrepancies = async (req, res) => {
    try {
      const { reportId } = req.params;
      if (!reportId) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const materilCountings = await materilCountingsModel.find({ reportId }).lean();
      const materialDetails = await materialDetailsModel.find({ reportId }).lean();

      
      if (!materilCountings || !materialDetails) {
        return res.status(404).json({
          success: false,
          message: "There is no data with that reportId or your reportId is invalid",
        });
      }

      const materialCountingMap = {};
      materilCountings.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!materialCountingMap[item.materialCode]) {
            materialCountingMap[item.materialCode] = {
              materialName: item.materialName,
              materialCounting : 0,
              
            };
          }
          materialCountingMap[item.materialCode].materialCounting += item.materialCounting;
        
          
        });
      });

      const materialDetailsMap = {};
      materialDetails.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!materialDetailsMap[item.productCode]) {
            materialDetailsMap[item.productCode] = {
              consumptionNumber: 0,
              endAmount:  0, 
             endNumber: 0,
            };
          }
         
          materialDetailsMap[item.productCode].endAmount += item.endAmount ;
          materialDetailsMap[item.productCode].endNumber += item.endNumber ;
          console.log('11111',materialDetailsMap[item.productCode].endNumber );
          console.log('222', materialDetailsMap[item.productCode].endAmount );
          
       
          
        });
      });

      const discrepancies = [];
      for (const materialCode in materialCountingMap) {
        const productCode = Object.keys(materialDetailsMap).find((productCode) => productCode === materialCode);
       
        
        
        if (productCode) {
            const endNumber = materialDetailsMap[productCode].endNumber || 0; 
          const discrepancy =
          
          materialCountingMap[materialCode].materialCounting - endNumber;
          const rate = materialDetailsMap[productCode].endNumber !== 0 ?
            materialDetailsMap[productCode].endAmount / materialDetailsMap[productCode].endNumber : 0;
          const discrepancyAmount = rate * discrepancy;

          discrepancies.push({
            materialCode,
            materialName: materialCountingMap[materialCode].materialName,
            materialCounting: materialCountingMap[materialCode].materialCounting,
            endNumber : materialDetailsMap[productCode].endNumber,
            discrepancy,
            rate,
            discrepancyAmount,
          });
        }
      }

      res.status(200).json({
        success: true,
        reportId,
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
