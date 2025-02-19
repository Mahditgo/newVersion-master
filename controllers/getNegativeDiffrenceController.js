

const salesModel = require('./../models/salesDetailsModel');
const approvaModel = require('./../models/apporovalSaleModel');


exports.getNegativeRateDifference = async (req, res) => {
  try {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }

    const sales = await salesModel.find({ reportId : activeReport }).lean();
    const approvals = await approvaModel.find({ reportId : activeReport }).lean();

    if (!sales.length || !approvals.length) {
      return res.status(404).json({
        success: false,
        message: "There is no data with that reportId or your reportId is invalid",
      });
    }

    const approvalMap = {};
    approvals.forEach((doc) => {
      doc.items.forEach((item) => {
        if (!approvalMap[item.productCode]) {
          approvalMap[item.productCode] = [];
        }
        approvalMap[item.productCode].push({
          approvalDate: new Date(item.approvalDate),
          approvalRate: item.approvedRate,
        });
      });
    });

    

        
    

    const discrepancies = [];

    sales.forEach((doc) => {
      doc.items.forEach((item) => {
        if (!approvalMap[item.productCode]) return;

        const invoiceDate = new Date(item.InvoiceDate);

        
        let closestApproval = approvalMap[item.productCode].filter((approval) => {
          return new Date(approval.approvalDate) <= invoiceDate;
        }).reduce((closest, current) => {
          const currentDiff = invoiceDate - new Date(current.approvalDate);
          const closestDiff = closest ? invoiceDate - new Date(closest.approvalDate) : Infinity;
          
         
          return currentDiff < closestDiff ? current : closest;
        }, null);

       

       
        if (!closestApproval) {
         
         
          discrepancies.push({
            InvoiceNumber: item.InvoiceNumber,
            InvoiceDate: item.InvoiceDate,
            buyersName: item.buyersName,
            rate : item.rate,
            unit: item.unit,
            productCode: item.productCode,
            productName: item.productName,
            approvalDate: null,
            approvalRate: 0, 
            amount: item.amount,
            rateDifference: 0,
            amountDifference: 0,
          });
          return;
        
    }
      
    const rateDifference = item.rate - closestApproval.approvalRate;
    const amountDifference = rateDifference * item.amount;
    const a = amountDifference / item.salesAmount;
    // console.log(a);
    
       
        // const validRateDifference = rateDifference < 0 ? 0 : rateDifference;
        // const validAmountDifference = amountDifference < 0 ? 0 : amountDifference;


        if(rateDifference < 0) {

          discrepancies.push({
            InvoiceNumber: item.InvoiceNumber,
            InvoiceDate: item.InvoiceDate,
            buyersName: item.buyersName,
            salesAmount : item.salesAmount,
            unit: item.unit,
            rate : item.rate,
            productCode: item.productCode,
            productName: item.productName,
            approvalDate: closestApproval.approvalDate.toISOString(),
            approvalRate: closestApproval.approvalRate,
            amount: item.amount,
            rateDifference,
            amountDifference,
            a
            
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
