
const fs = require('fs'); 
const path = require('path');

const XLSX = require('xlsx'); 
const SalesDetail = require('../models/salesDetailsModel');


exports.uploadSales = async (req, res) => {
    try {
        
        
        
        const filePath = req.file.path;
        
        // console.log(filePath);
        

        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header : 1, blankrows : false});
        
   
        data.shift();

    
        const items = data.map((row) => ({
            InvoiceNumber: row[0] || 0,
            InvoiceDate: row[1] || 0,
            BuyerDetailCode: row[2] || 0,
            buyersName: row[3] || '0',
            productCode: row[4] || null,
            productName: row[5] || '0',
            unit: row[6] || null,
            amount: row[7] || '0',
            rate: row[8] || null,
            salesAmount: row[9] || null,
            AddedValue: row[10],
            finalAmount: row[11] || null
        }));

  
        const existingRecord = await SalesDetail.findOne({ reportId: req.body.reportId });

        let record;

        if (existingRecord) {
            existingRecord.filePaths = existingRecord.filePaths || [];
            existingRecord.filePaths.push(filePath);
            existingRecord.items.push(...items);
            record = await existingRecord.save();  
        }else {

            record = new SalesDetail({
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

exports.getAllSales = async (req, res) => {
    try {

      const records = await SalesDetail.find();

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

exports.deleteSales = async (req, res) => {
    
    try {
        const { id } = req.params;
        const sales = await SalesDetail.findById(id);

        if (!sales) {
            return res.status(404).json({
                success: false,
                message: 'No sales  found with the provided id',
            });
        }

        
        if (sales.filePaths && sales.filePaths.length > 0) {
            for (const filePath of sales.filePaths) {
                try {
                    const absolutePath = path.join(__dirname, '..',  filePath.replace(/\\/g, '/'));
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
            console.warn('No filePaths available for this sales.');
        }

        
        await SalesDetail.findByIdAndDelete(id);

        
        if (!res.headersSent) {
            return res.status(200).json({
                success: true,
                message: 'sales and its files were successfully deleted',
            });
        }
    } catch (error) {
        console.error(`Error in deleting sales: ${error.message}`);
        
        
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};


exports.deleteSalesRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const sales = await SalesDetail.findById(id);

        if (!sales) {
            return res.status(404).json({
                success: false,
                message: 'No sales  found with the provided id',
            });
        }

        const result = await SalesDetail.updateOne(
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