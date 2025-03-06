const BudjetProject = require("../models/budjetProjectModel");


exports.createBudjectProject = async ( req, res ) => {

    const { reportId } = req.params;
    const {reportName, year, jobTitle , employeePostion, budjetHour} = req.body;
    console.log(req.body);
    
    
    try {
        
        if( !reportName || !year || !jobTitle || !employeePostion || !budjetHour) {
            return res.status(404).json('All field are required');
        }

        const newBudjet = {
            reportName,
            year,
            jobTitle,
            employeePostion,
            budjetHour
        };

        let result;
        const existingBudjet = await BudjetProject.findOne({ reportId });

        if (existingBudjet) {
           
            existingBudjet.items.push(newBudjet);
            result = await existingBudjet.save();
        } else {
            
            const newBudjetProject = new BudjetProject({
                reportId ,
                items: [newBudjet]
            });
            result = await newBudjetProject.save();
        }

        console.log('Saved Result:', result); 
        res.json(result);

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Internal server error');
        
    }
};


exports.getBudjetProject = async ( req, res) => {

    
    const { reportId } = req.params;

 try {

    const budjet = await BudjetProject.find({reportId}).lean();

    if (!budjet || budjet.length === 0) {
        return res.status(404).json({ message: 'No budjet found' });
    }

    res.status(200).json({
        message: 'budjet retrieved successfully',
        data: budjet
    });

 } catch (error) {
    console.error(err.message);
        res.status(500).json({ message: 'Internal server error', error: err.message });
 }
   

};


exports.updateBudjet = async ( req, res ) => {
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

        const updatedBankInfo = await BudjetProject.findOneAndUpdate(
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
            return res.status(404).json({ message:  'budjet not found' });
        }

        
        res.status(200).json({
            message: '  budjet updated successfully.',
            data: updatedBankInfo,
        });

    }catch(e) {

        console.error(e.message);
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
}