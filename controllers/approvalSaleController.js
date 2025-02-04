const ApprovalModel = require('./../models/apporovalSaleModel')



exports.createApprovalSale = async (req, res) =>{

    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }
    const { productCode, productName, approvalDate, approvedRate, currencyType} = req.body;

    try {

        if(!productCode || !productName || !approvalDate || !approvedRate || !currencyType) {
            return res.status(404).json({ success : false, message : 'All fiels are required!'});
        }

        const newApproval = {
            productCode,
            productName,
            approvalDate,
            approvedRate,
            currencyType

        }

        let result;
        const approvalExist = await ApprovalModel.findOne({reportId : activeReport});
        if(approvalExist) {
            approvalExist.items.push(newApproval);
            result = await approvalExist.save();
        }else {
            const newApp = await ApprovalModel({
                reportId : activeReport,
                items : [newApproval]
            });
            result = await newApp.save();
        };

        res.status(201).json(result)

    }catch(e) {
        console.log(e.message);
        res.status(500).json('Internal server error')
        
    }
 };

 
 exports.getAllApprovals = async (req, res ) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }

    try {

        const result = await ApprovalModel.findOne({ reportId : activeReport });

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No result found' });
        }

        res.status(200).json({
            message: 'Records retrieved successfully',
            data: result
        });
    }catch (e) {
        console.log(e.message);
        res.status(500).json('Internal server error')
    }
 };



 exports.deleteApprovalRow = async (req, res) => {
    const {id, itemId } = req.params;
    try {
        const approval = await ApprovalModel.findById(id);

        if (!approval) {
            return res.status(404).json({
                success: false,
                message: 'No productCounting  found with the provided id',
            });
        }

        const result = await ApprovalModel.updateOne(
            { _id: id },
            { $pull: { items: { _id: itemId } } }
          );

          if (result.modifiedCount  > 0) {
            res.status(200).send({ message: 'Item deleted successfully!' });
          } else {
            res.status(404).send({ message: 'Item not found!' });
          }

    }catch(e) {
        console.log(e.message);
        res.status(500).json({success : false, message : 'Internal serverError'});
        
    }

}