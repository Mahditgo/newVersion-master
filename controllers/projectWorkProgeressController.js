const ProjectWorkProgress = require("../models/projectWorkProgressModel");




exports.creatProjectProgress = async ( req, res) => {
    
const { reportId } = req.params;
// let { user } = req
// let { activeReport } = user
// if(!activeReport){
//     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
// }
// const { ...items } = req.body; 
// console.log(items);


    try {


        let result;
        const existingReport = await ProjectWorkProgress.findOne({reportId  });
        if(existingReport) {
            existingReport.items.push(req.body);
            result = await existingReport.save();
        } else {
            const newBankInfo = new ProjectWorkProgress({
                reportId ,
                items : [req.body]
            });
            result = await newBankInfo.save();
        }
            res.status(201).json(result);
    }catch(e) {
        console.log(e.message);
        res.status(500).json("Internal server error");
        
    }
};


exports.getProjectProgress = async ( req ,res ) => {

    try {
        
        const { reportId } = req.params;
        // let { user } = req
        // let { activeReport } = user
        // if(!activeReport){
        //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        // }

        
        const records = await ProjectWorkProgress.findOne({reportId }); 

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

}

exports.deleteWorkProgress = async (req , res) => {
    const { id } = req.params;

    try {

        const project = await ProjectWorkProgress.findByIdAndDelete(id);
        if(!project)  {
            return res.status(404).json({success : false , message : 'Project Progress not found'});
        };

        res.status(200).json({success: true, message: 'Project Progress deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};


exports.deleteProjectWorkRow = async (req, res) => {
    const { id, itemId } = req.params;
    console.log(itemId);
    
try {
    const project = await ProjectWorkProgress.findById(id);
    console.log(project);
    

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'No productCounting  found with the provided id',
            });
        }

        const result = await ProjectWorkProgress.updateOne(
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

};


exports.updateProjectWork = async(req, res) => {
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

        const updatedBankInfo = await ProjectWorkProgress.findOneAndUpdate(
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