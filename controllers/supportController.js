
const supportModel = require('./../models/supportModel')



exports.createSupportRequest = async (req, res ) => {
    
    const { 
        InstituteName, 
        InstituteId,
        userId, 
        classification, 
        requestTime, 
        userOccupation, 
        requestDescription, 
        answeDate, 
        responseTime, 
        answerDescription, 
        applicationStatus ,
        userName, 
            
        
    } = req.body;
    // console.log(req.body);
    

    try  {

       

        const requiredFields = [
            "userName", "userId", "classification", "InstituteName", "InstituteId", 
            "requestTime", "userOccupation", "requestDescription", "answeDate", 
            "responseTime", "answerDescription", "applicationStatus"
        ];

      
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `فیلد ${field} الزامی است` });
            }
        
    }
    
    const newSupport = {
                userId, 
                classification, 
                requestTime, 
                userOccupation, 
                requestDescription, 
                answeDate, 
                responseTime, 
                answerDescription, 
                applicationStatus ,
                userName, 
    };

    
    

    let result;
        const existingReport = await supportModel.findOne({ InstituteId });
        // console.log(existingReport);
        
        if(existingReport) {
            existingReport.items.push(newSupport);
            result = await existingReport.save();
            console.log(result);
            
        } else {
            const newBankInfo = new supportModel({
                InstituteName,
                InstituteId,
                items : [newSupport]
            });
            result = await newBankInfo.save();
        }
            res.status(201).json(result);
      
            
       
    }catch (e) {
        console.error(e);
        res.status(500).json({message : "internal server error"});
    }
};




exports.respondToSupportRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const { adminResponse, applicationStatus} = req.body;

        
        const supportRequest = await supportModel.findOne({ 'items.userId': userId,});
        console.log(supportRequest);
        

        if (!supportRequest) {
            return res.status(404).json({ message: 'Request not found or already responded' });
        }

        
        const item = supportRequest.items.find(item => item.userId === userId );
        console.log(item);
        

        
        item.adminResponse = adminResponse;
        item.applicationStatus = applicationStatus;
        

        
        await supportRequest.save();

        res.status(200).json({
            message: 'Response added successfully',
            data: supportRequest
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getSupport = async ( req, res ) => {

    try {
        
        const { userId } = req.params;
        console.log(userId);
        

        
        const records = await supportModel.findOne({ "items.userId" : userId });
        console.log(records);

        if (!records) {
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


exports.getSupportByInstituteId = async (req, res) => {
    try {
        
        const { InstituteId } = req.params;

        
        const records = await supportModel.findOne({InstituteId}); 

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


exports.getAllSupports = async (req, res) => {
    try {

        const records = await supportModel.find();
        console.log(records);

        if (!records) {
            return res.status(404).json({ message: 'No records found' });
        }
        res.status(200).json({
            message: 'Records retrieved successfully',
            data: records
        });

    }catch(e) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}