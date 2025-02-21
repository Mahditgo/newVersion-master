

const salesModel = require('./../models/salesDetailsModel');
const approvaModel = require('./../models/apporovalSaleModel');


exports.getRateDifference = async (req, res) => {
  try {
    const { reportId } = req.params;

    const sales = await salesModel.find({ reportId }).lean();
    const approvals = await approvaModel.find({ reportId }).lean();

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
        console.log(invoiceDate);
        

        
        let closestApproval = approvalMap[item.productCode].filter((approval) => {
          console.log('1111111',invoiceDate);
          return new Date(approval.approvalDate) <= invoiceDate;
          
          
        }).reduce((closest, current) => {
          const currentDiff = invoiceDate - new Date(current.approvalDate);
          // console.log(currentDiff);
          const diffInMs = invoiceDate - new Date(current.approvalDate);
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
          console.log(`تفاوت زمانی: ${diffInDays} روز`);
          
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

       
        // const validRateDifference = rateDifference < 0 ? 0 : rateDifference;
        // const validAmountDifference = amountDifference < 0 ? 0 : amountDifference;
     

          discrepancies.push({
            InvoiceNumber: item.InvoiceNumber,
            InvoiceDate: item.InvoiceDate,
            buyersName: item.buyersName,
            unit: item.unit,
            rate : item.rate,
            productCode: item.productCode,
            productName: item.productName,
            approvalDate: closestApproval.approvalDate.toISOString(),
            approvalRate: closestApproval.approvalRate,
            amount: item.amount,
            rateDifference,
            amountDifference,
          });
        
      });
    });

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
