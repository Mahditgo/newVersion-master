 


 const productCountingDetailsModel = require('./../models/productCountingModel');

 const warehouseModel = require('./../models/WarehouseModel');
  

exports.getProductDiscrepancies = async (req, res) => {
    try {
      const { reportId } = req.params;
      if (!reportId) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const warehouse = await warehouseModel.find({ reportId }).lean();
      const ProductCountingDetails = await productCountingDetailsModel.find({ reportId }).lean();

      
      if (!warehouse || !ProductCountingDetails) {
        return res.status(404).json({
          success: false,
          message: "There is no data with that reportId or your reportId is invalid",
        });
      }
      

      const productCountingMap = {};
      ProductCountingDetails.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!productCountingMap[item.productCode]) {
            productCountingMap[item.productCode] = {
              productName: item.productName,
              counting : 0,
              
            };
          }
          productCountingMap[item.productCode].counting += item.counting;
        
          
        });
      });

      const warehouseMap = {};
      warehouse.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!warehouseMap[item.productCode]) {
            warehouseMap[item.productCode] = {
              consumptionNumber: 0,
              endAmount:  0, 
             endNumber: 0,
            };
          }
         
          warehouseMap[item.productCode].endAmount += item.endAmount ;
          warehouseMap[item.productCode].endNumber += item.endNumber ;
          console.log('11111',warehouseMap[item.productCode].endNumber );
          console.log('222', warehouseMap[item.productCode].endAmount );
          
       
          
        });
      });

      const discrepancies = [];
      for (const productCode in warehouseMap) {
        
       
        
        
        if (productCountingMap[productCode]) {
            const endNumber = warehouseMap[productCode].endNumber || 0; 
          const discrepancy =
          
          productCountingMap[productCode].counting - endNumber;
          const rate = warehouseMap[productCode].endNumber !== 0 ?
            warehouseMap[productCode].endAmount / warehouseMap[productCode].endNumber : 0;
          const discrepancyAmount = rate * discrepancy;

          discrepancies.push({
            productCode,
            productName : productCountingMap[productCode].productName,
            productCounting: productCountingMap[productCode].counting,
            endNumber : warehouseMap[productCode].endNumber,
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
