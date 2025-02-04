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


//   const productCountings = await ProductCountingDetails.find({ reportId }).lean();
// const productions = await ProductionsDetails.find({ reportId }).lean();

// if (!productCountings || !productions) {
//   return res.status(404).json({
//     success: false,
//     message: "There is no data with that reportId or your reportId is invalid",
//   });
// }

// // ذخیره productCodeهایی که در هر دو مدل وجود دارند
// const productCodeSet = new Set();
// const productionMap = {};

// // جمع‌زنی productionQuantity فقط برای productCodeهایی که در productions وجود دارند
// productions.forEach((doc) => {
//   doc.items.forEach((item) => {
//     productionMap[item.productCode] = productionMap[item.productCode] || {
//       productName: item.productName,
//       productionQuantity: 0,
//     };
//     productionMap[item.productCode].productionQuantity += item.productionQuantity;
//     productCodeSet.add(item.productCode);
//   });
// });

// // جمع‌زنی counting فقط برای productCodeهایی که در countings وجود دارند
// const countingMap = {};
// productCountings.forEach((doc) => {
//   doc.items.forEach((item) => {
//     if (productCodeSet.has(item.productCode)) { // فقط اگر در productions وجود داشته باشد
//       countingMap[item.productCode] = countingMap[item.productCode] || { productCounting: 0 };
//       countingMap[item.productCode].productCounting += item.counting;
//     }
//   });
// });

// // مقایسه مقادیر و محاسبه اختلاف‌ها فقط برای `productCode`های مشترک
// const discrepancies = [];
// for (const productCode in countingMap) {
//   if (productionMap[productCode]) {
//     discrepancies.push({
//       productCode,
//       productName: productionMap[productCode].productName,
//       productCounting: countingMap[productCode].productCounting,
//       productionQuantity: productionMap[productCode].productionQuantity,
//       discrepancy:
//         productionMap[productCode].productionQuantity - countingMap[productCode].productCounting,
//     });
//   }
// }

// res.status(200).json({
//   success: true,
//   reportId,
//   data: discrepancies,
// });
