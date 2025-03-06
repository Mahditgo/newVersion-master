const GroupMessage = require("../models/groupMessageModel");



exports.createGroupMessage = async (req, res) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }
    const { InstituteName, instituteId, messageDate, description } = req.body;
    console.log(req.body);
    

    try {

        if(!instituteId || !InstituteName || !messageDate || !description ) {
            return res.status(404).json("All fields are required!");
        }

        const newMessage = {
            InstituteName,
            instituteId,
            messageDate,
            description
        };

        let result;
        const existingMessage = await GroupMessage.findOne({reportId : activeReport});

        if(existingMessage) {
            existingMessage.items.push(newMessage);
            result = await existingMessage.save()
        } else {
            const newGroupMessage = new GroupMessage({
                reportId : activeReport,
                items : [newMessage]
            });
            result = await newGroupMessage.save();
        };

        res.status(201).json(result);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json("internal Server Error");
        
    }
};





exports.getGroupMeassages = async(req, res) => {
    try {
        
        let { user } = req
        let { activeReport } = user
        if(!activeReport){
            return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        }

        
        const records = await GroupMessage.findOne({reportId : activeReport}); 

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


exports.deleteMessageGroup = async (req , res) => {
    const { id } = req.params;

    try {

        const BankInfo = await GroupMessage.findByIdAndDelete(id);
        if(!BankInfo)  {
            return res.status(404).json({success : false , message : 'groupMEssage not found'});
        };

        res.status(200).json({success: true, message: 'groupMEssage deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};

exports.updateMessageGroup = async(req, res) => {
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

        const updatedBankInfo = await GroupMessage.findOneAndUpdate(
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
            return res.status(404).json({ message:  'groupMEssage not found' });
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
