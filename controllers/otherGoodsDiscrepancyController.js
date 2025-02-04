const otherGoodsCountingsModel = require('./../models/otherGoodsCountingModel');
const otherGoodsModel = require('./../models/otherGoodsModel');


exports.getotherGoodDiscrepancies = async (req, res) => {
    try {
      const { reportId } = req.params;
      if (!reportId) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const otherGoodCountings = await otherGoodsCountingsModel.find({ reportId }).lean();
      const otherGoods = await otherGoodsModel.find({ reportId }).lean();
      console.log(otherGoodCountings,  otherGoods);
      

      
      if (!otherGoodCountings || !otherGoods) {
        return res.status(404).json({
          success: false,
          message: "There is no data with that reportId or your reportId is invalid",
        });
      }

      const otherGoodCountingMap = {};
      otherGoodCountings.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!otherGoodCountingMap[item.otherGoodCode]) {
            otherGoodCountingMap[item.otherGoodCode] = {
              materialName: item.materialName,
              otherGoodCounting : 0,
              
            };
          }
          otherGoodCountingMap[item.otherGoodCode].otherGoodCounting += item.otherGoodCounting;
          console.log('222222');
          
        
          
        });
      });

      const otherGoodsMap = {};
      otherGoods.forEach((doc) => {
        doc.items.forEach((item) => {
          if (!otherGoodsMap[item.warehouseCode]) {
            otherGoodsMap[item.warehouseCode] = {
              
              endAmount:  0, 
             endNumber: 0,
            };
          }
         
          otherGoodsMap[item.warehouseCode].endAmount += item.endAmount ;
          otherGoodsMap[item.warehouseCode].endNumber += item.endNumber ;
        //   console.log('11111',otherGoodsMap[item.warehouseCode].endNumber );
        //   console.log('222', otherGoodsMap[item.warehouseCode].endAmount );
          
       
          
        });
      });

      const discrepancies = [];
      for (const otherGoodCode in otherGoodCountingMap) {
        const warehouseCode = Object.keys(otherGoodsMap).find((warehouseCode) => warehouseCode === otherGoodCode);
       console.log('1111');
       console.log('2222');
       
        
        
        if (warehouseCode) {
            const endNumber = otherGoodsMap[warehouseCode].endNumber || 0; 
          const discrepancy =
          
          otherGoodCountingMap[otherGoodCode].otherGoodCounting - endNumber;
          const rate = otherGoodsMap[warehouseCode].endNumber !== 0 ?
            otherGoodsMap[warehouseCode].endAmount / otherGoodsMap[warehouseCode].endNumber : 0;
          const discrepancyAmount = rate * discrepancy;

          discrepancies.push({
            otherGoodCode,
            otehrGoodName: otherGoodCountingMap[otherGoodCode].otherGoodName,
            otherGoodCounting: otherGoodCountingMap[otherGoodCode].otherGoodCounting,
            endNumber : otherGoodsMap[warehouseCode].endNumber,
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
