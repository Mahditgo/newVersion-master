
const BankInfoModel = require('./../models/bankInformationModel')

exports.createBackInfo = async (req, res ) => {
    const { reportId } = req.params;

    const {
        moeinCode,
        tafsilCode,
        bankName,
        accountType,
        accountNumber,
        currencyType,
        depositType,
        statuse,
        debtBalance,
        creditBalance,
        currencyDebtBalance,
        currencyCreditBalance,
        profitPercentage,
        profitAmount
    } = req.body;
    console.log(req.body);
    

    try {
 if (
     !moeinCode || !tafsilCode || !bankName || !accountType ||
     !accountNumber || !currencyType || !depositType || !statuse ||
     debtBalance === undefined || creditBalance === undefined ||
     currencyDebtBalance === undefined || currencyCreditBalance === undefined ||
     profitPercentage === undefined || profitAmount === undefined
        ) {
            return res.status(400).json({ message: 'تمام فیلدها الزامی هستند.' });
        };


        const newAccount = {
            moeinCode,
            tafsilCode,
            bankName,
            accountType,
            accountNumber,
            currencyType,
            depositType,
            statuse,
            debtBalance,
            creditBalance,
            currencyDebtBalance,
            currencyCreditBalance,
            profitPercentage,
            profitAmount
        };

        let result;
        const existingReport = await BankInfoModel.findOne({reportId});
        if(existingReport) {
            existingReport.items.push(newAccount);
            result = await existingReport.save();
        } else {
            const newBankInfo = new BankInfoModel({
                reportId,
                items : [newAccount]
            });
            result = await newBankInfo.save();
        }
            res.status(201).json(result);

    }catch(e) {
        console.log(e.message);
        res.status(500).json('intenal server error');
        
    }
};


exports.getBankInfoDetails = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await BankInfoModel.findOne({reportId}); 

        if (!records || records.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }

        res.status(200).json({
            message: 'Records retrieved successfully',
            data: records
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};


exports.deleteBankInfo = async (req , res) => {
    const { id } = req.params;

    try {

        const BankInfo = await BankInfoModel.findByIdAndDelete(id);
        if(!BankInfo)  {
            return res.status(404).json({success : false , message : 'Insurancecoverage not found'});
        };

        res.status(200).json({success: true, message: 'Insurancecoverage deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};

exports.updateBankInfo = async(req, res) => {
    const { itemId } = req.params;
    const updatesFields = req.body;
    console.log(updatesFields);
    

    try {

        if ( !itemId) {
            return res.status(400).json({ message: 'reportID and itemId are required' });
        }

        if (Object.keys(updatesFields).length === 0) {
            return res.status(400).json({ message: 'No fields valid for update' });
        }

        const updateQuery = Object.keys(updatesFields).reduce((acc, key) => {
            acc[`items.$.${key}`] = updatesFields[key];
            return acc;
        }, {});

        const updatedBankInfo = await BankInfoModel.findOneAndUpdate(
            {
                    
                "items._id": itemId, 
            },
            {
                $set: updateQuery, 
            },
            {
                new: true,
            }
        );

        if (!updatedBankInfo) {
            return res.status(404).json({ message:  'bank information not found' });
        }

        
        res.status(200).json({
            message: '  informations updated successfully.',
            data: updatedBankInfo,
        });

    }catch(e) {

        console.error(e.message);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};



exports.deleteBankInfo = async (req , res) => {
    const { id } = req.params;

    try {

        const bankInfo = await BankInfoModel.findByIdAndDelete(id);
        if(!bankInfo)  {
            return res.status(404).json({success : false , message : 'Bank information not found'});
        };

        res.status(200).json({success: true, message: 'Bank information deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};


exports.deleteBankInfoRow = async (req, res) => {
    const { materialId } = req.params;
try {
    const bankInfo = await BankInfoModel.findById(id);

        if (!bankInfo) {
            return res.status(404).json({
                success: false,
                message: 'No productCounting  found with the provided id',
            });
        }

        const result = await BankInfoModel.updateOne(
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