const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')

const otherGoodsModel = require('./../models/otherGoodsModel');

exports.uplaodOtherGoods = async (req, res) => {
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
      warehouseCode: row[0] || 0,  
      warehouseName: row[1] || '0',
      productCode: row[2] || '0',
      productName: row[3] || '0',
      firstNumber: parseFloat(row[4]) || 0,
      firstAmount: parseFloat(row[5]) || 0,
      purchaseNumber: parseFloat(row[6]) || 0,
      purchaseAmount: parseFloat(row[7]) || 0,
      consumptionNumber: parseFloat(row[8]) || 0,
      consumptionAmount: parseFloat(row[9]) || 0,
      endNumber: parseFloat(row[10]) || 0,
      endAmount: parseFloat(row[11]) || 0,
    }));



  
        const existingRecord = await otherGoodsModel.findOne({ reportId: req.body.reportId });

        let record;

        if (existingRecord) {
            existingRecord.filePaths = existingRecord.filePaths || [];
            existingRecord.filePaths.push(filePath);
            existingRecord.items.push(...items);
            record = await existingRecord.save();  
        }else {

            record = new otherGoodsModel({
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


exports.getOtherGoods = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await otherGoodsModel.find({reportId}); 

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



exports.deleteOtherGood = async (req, res) => {
    try {
        const { id } = req.params;
        const goods = await otherGoodsModel.findById(id);

        if (!goods) {
            return res.status(404).json({
                success: false,
                message: 'No property found with the provided reportId',
            });
        }

        
        if (goods.filePaths && goods.filePaths.length > 0) {
            for (const filePath of goods.filePaths) {
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
            console.warn('No filePaths available for this other goods.');
        }

        
        await otherGoodsModel.findByIdAndDelete(id);

        
        if (!res.headersSent) {
            return res.status(200).json({
                success: true,
                message: 'goods and its files were successfully deleted',
            });
        }
    } catch (error) {
        console.error(`Error in deleting other goods: ${error.message}`);
        
        
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};


exports.deleteGoodsRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const goods = await otherGoodsModel.findById(id);

        if (!goods) {
            return res.status(404).json({
                success: false,
                message: 'No goods  found with the provided id',
            });
        }

        const result = await otherGoodsModel.updateOne(
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