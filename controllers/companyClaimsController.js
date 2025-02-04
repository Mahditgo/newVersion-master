
const companyClaimModel = require('./../models/companyClaimsModel');

exports.createCompanyClaims = async (req, res ) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }

    const {
        moeinCode,
        tafsilCode,
        Name,
        description,
        type,
        collectionForecast,
        documentation,
        guaranteeAmount,
        guaranteeType,
        guarantee,
        lastPayment,
        receivablesStorage
      } = req.body;
    

    try {

        if (
            !moeinCode || !tafsilCode || !Name || !description ||
            !type || !collectionForecast || !documentation ||
            guaranteeAmount === undefined || !guaranteeType ||
            !guarantee || !lastPayment || receivablesStorage === undefined
          ) {
            return res.status(400).json({ message: "تمام فیلدها الزامی هستند." });
          }


        const newCompanyClaims = {
            moeinCode,
            tafsilCode,
            Name,
            description,
            type,
            collectionForecast,
            documentation,
            guaranteeAmount,
            guaranteeType,
            guarantee,
            lastPayment,
            receivablesStorage
        };

        let result;
        const existingReport = await companyClaimModel.findOne({reportId : activeReport });
        if(existingReport) {
            existingReport.items.push(newCompanyClaims);
            result = await existingReport.save();
        } else {
            const newcompanyClaim = new companyClaimModel({
                reportId : activeReport,
                items : [newCompanyClaims]
            });
            result = await newcompanyClaim.save();
        }
            res.status(201).json(result);

    }catch(e) {
        console.log(e.message);
        res.status(500).json('intenal server error');
        
    }
};


exports.getcompanyClaims = async (req, res) => {
    try {
        
        let { user } = req
        let { activeReport } = user
        if(!activeReport){
            return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        }

        
        const records = await companyClaimModel.findOne({reportId : activeReport }); 

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


exports.deletecompanyClaims = async (req , res) => {
    const { id } = req.params;

    try {

        const records = await companyClaimModel.findByIdAndDelete(id);
        if(!records)  {
            return res.status(404).json({success : false , message : 'companyClaims not found'});
        };

        res.status(200).json({success: true, message: 'companyClaims deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};


exports.deleteBankInfoRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const company = await companyClaimModel.findById(id);

        if (!company) {
            return res.status(404).json({
                success: false,
                message: 'No company  found with the provided id',
            });
        }

        const result = await companyClaimModel.updateOne(
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


exports.updatecompanyClaims = async(req, res) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }
    const { itemId } = req.params;
    const updatesFields = req.body;
    console.log(updatesFields);
    

    try {

        // if (!reportId || !itemId) {
        //     return res.status(400).json({ message: 'reportID and itemId are required' });
        // }

        if (Object.keys(updatesFields).length === 0) {
            return res.status(400).json({ message: 'No fields valid for update' });
        }

        const updateQuery = Object.keys(updatesFields).reduce((acc, key) => {
            acc[`items.$.${key}`] = updatesFields[key];
            return acc;
        }, {});

        const updatecompany = await companyClaimModel.findOneAndUpdate(
            {
                reportId : activeReport,       
                "items._id": itemId, 
            },
            {
                $set: updateQuery, 
            },
            {
                new: true,
            }
        );

        if (!updatecompany) {
            return res.status(404).json({ message:  'bank information not found' });
        }

        
        res.status(200).json({
            message: '  informations updated successfully.',
            data: updatecompany,
        });

    }catch(e) {

        console.error(e.message);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
};