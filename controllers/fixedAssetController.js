const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')

const FixedAsset = require('../models/fixedAssetModel');

exports.uplaodFixedAsset = async (req, res) => {
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
        landDetails: row[0] || '0',  
        builingDetails: row[1] || '0',
        furnitureDetails: row[2] || '0',
        machineDetails: row[3] || '0',
        facilitiesDeails: row[4] || '0',
        carDetails: row[5] || '0',
        toolesDetails: row[6] || '0',
        otherAssetsDetails: row[7] || '0',
       
    }));



  
        const existingRecord = await FixedAsset.findOne({ reportId: req.body.reportId });

        let record;

        if (existingRecord) {
            existingRecord.filePaths = existingRecord.filePaths || [];
            existingRecord.filePaths.push(filePath);
            existingRecord.items.push(...items);
            record = await existingRecord.save();  
        }else {

            record = new FixedAsset({
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
};


exports.getFixedAsset = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await FixedAsset.find({reportId}); 

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


exports.deleteFixedAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await FixedAsset.findById(id);

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

        
        await FixedAsset.findByIdAndDelete(id);

        
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



exports.deleteFixedAssetRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const property = await FixedAsset.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'No property  found with the provided id',
            });
        }

        const result = await FixedAsset.updateOne(
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
