const salesModel = require('./../models/salesDetailsModel');
const warehouseModel = require('./../models/WarehouseModel');
  
  const getsalesDiscrepancies = async (req, res) => {
    try {

      const { reportId } = req.params;
    // let { user } = req
    // let { activeReport } = user
    // if(!activeReport){
    //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    // }
  
      if (!reportId) {
        return res.status(400).json({
          success: false,
          message: "Report ID is required",
        });
      }

      const sales = await salesModel.find({reportId }).lean();
     
      const warehous = await warehouseModel.find({reportId }).lean();
  
      if (!sales || !warehous) {
        return res.status(404).json({
          success: false,
          message: "There is no data with that reportId or your reportId is invalid",
        });
      }
    
      const salesMap = {};
        sales.forEach((doc) => {
        doc.items.forEach((item) => {
        if (!salesMap[item.productCode]) {
        salesMap[item.productCode] = {
        productName: item.productName,
        amount: 0,
      };
    }
    salesMap[item.productCode].amount += item.amount;
  });
});

const warehousMap = {};
warehous.forEach((doc) => {
  doc.items.forEach((item) => {
    if (!warehousMap[item.productCode]) {
      warehousMap[item.productCode] = {
        consumptionAmount: 0,
      };
    }
    warehousMap[item.productCode].consumptionAmount += item.consumptionAmount;
  });
});


const discrepancies = [];
for (const productCode in warehousMap) {
  if (salesMap[productCode]) {
    const discrepancy =
      warehousMap[productCode].consumptionAmount - salesMap[productCode].amount;

    discrepancies.push({
      productCode,
      productName: salesMap[productCode].productName,
      consumptionAmount: warehousMap[productCode].consumptionAmount,
      amount: salesMap[productCode].amount,
      discrepancy,
    });
  }
};
  
 
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
  
  module.exports = { getsalesDiscrepancies };

