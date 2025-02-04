const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')

const propertyModel = require('./../models/propertyDetailsModel');

exports.uplaodPropertyDetails = async (req, res) => {
    try {

        console.log(req.body.reportId);
        
        const filePath = req.file.path;
        
        console.log(filePath);
        

        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header : 1, blankrows : false});
        data = data.filter(row => row.some(cell => cell && cell.toString().trim() !== ''));
   
    data.shift();
    
    
    console.log(data);  

    const items = data.map((row) => ({
        propertyNumber: row[0] || '0',  
        propertyTitle: row[1] || '0',
        purchaseDate: row[2] || '0',
        loaction: row[3] || '0',
        descriptionRate: parseFloat(row[4]) || '0',
        descriptionMethod: parseFloat(row[5]) || '0',
        purchasePrice: parseFloat(row[6]) || 0,
        firstDepreciation: parseFloat(row[7]) || 0,
        bookValue: parseFloat(row[8]) || 0,
        periodDepreciation: parseFloat(row[9]) || 0,
        endDepreciation: parseFloat(row[10]) || 0,
    }));



  
        const existingRecord = await propertyModel.findOne({ reportId: req.body.reportId });

        let record;

        if (existingRecord) {
            existingRecord.filePaths = existingRecord.filePaths || [];
            existingRecord.filePaths.push(filePath);
            existingRecord.items.push(...items);
            record = await existingRecord.save();  
        }else {

            record = new propertyModel({
                reportId: req.body.reportId || null, 
                items,
                filePaths: [filePath]
            });
            await record.save();
        }


        res.status(200).json({
            message : "file uploaded successfully",
            record
        })


    }catch(e) {
        console.log(e.message);
        res.status(500).json('internal server error')
        
    }
}


exports.getPropertyDetails = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await propertyModel.find({reportId}); 

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



exports.deletePropertyDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await propertyModel.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'No property found with the provided reportId',
            });
        }

        
        if (property.filePaths && property.filePaths.length > 0) {
            for (const filePath of property.filePaths) {
                try {
                    const absolutePath = path.join(__dirname, '..', filePath.replace(/\\/g, '/'));
                    console.log(`Deleting file at: ${absolutePath}`);

                    if (fs.existsSync(absolutePath)) {
                        fs.unlinkSync(absolutePath);
                        console.log(`File deleted: ${absolutePath}`);
                    }
                } catch (err) {
                    console.error(`Error deleting file ${filePath}: ${err.message}`);
                }
            }
        } else {
            console.warn('No filePaths available for this property.');
        }

        
        await propertyModel.findByIdAndDelete(id);

        
        if (!res.headersSent) {
            return res.status(200).json({
                success: true,
                message: 'property and its files were successfully deleted',
            });
        }
    } catch (error) {
        console.error(`Error in deleting property: ${error.message}`);
        
        
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};


exports.deletePropertyRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const property = await propertyModel.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'No property  found with the provided id',
            });
        }

        const result = await propertyModel.updateOne(
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