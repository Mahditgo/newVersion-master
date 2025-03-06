const XLSX = require('xlsx');
const fs = require('fs');
// const path = require('path');


const productCountingModel = require('./../models/productCountingsModel');



exports.uplaodProductCounting = async (req, res) => {
    try {

        // const { reportId } = req.body;
        
        
        let { user } = req
        let { activeReport } = user
        if(!activeReport){
            return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        }

        const filePath = req.file.path;
        
        console.log(filePath);
        
         const workbook = XLSX.readFile(filePath);
         const sheetName = workbook.SheetNames[0];
         let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header : 1, blankrows : false});
         data = data.filter(row => row.some(cell => cell && cell.toString().trim() !== ''));
         data.shift();

        // console.log(data);  
      

        const items = data.map((row) => ({
            reportId : activeReport,
            productCode: row[0] || '0',  
            productName: row[1] || '0',
            productionQuantity: row[2] || 0,
            
      }));

        //   console.log(items);

        await productCountingModel.insertMany(items, {ordered : false, rawResult : false});


        //delete exel after proccess
        fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
            else console.log("Excel file deleted successfully!");
        });
  
        res.status(200).json({
            message: "file uploaded successfully",
            items 
        });


    }catch(e) {
        console.log(e.message);

        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error deleting file after failure:", err);
                else console.log("Excel file deleted due to failure!");
            });
        }

        res.status(500).json('internal server error')
        
    }
}



exports.getproductCountingDetails = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await productCountingModel.find({reportId}).lean(); 

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



exports.deleteProductCounting = async (req, res) => {
    try {
        const { reportId } = req.params;
        const productCounting = await productCountingModel.find({reportId});
        console.log(productCounting);
        

        if (!productCounting) {
            return res.status(404).json({
                success: false,
                message: 'No productCountings found with the provided reportId',
            });
        }

        
        await productCountingModel.deleteMany({reportId});

             res.status(200).json({
                success: true,
                message: 'prodductCounting and its files were successfully deleted',
            });
        
    } catch (error) {
        console.error(`Error in deleting other goods: ${error.message}`);
        
        res.status(200).json("internal")
       
    }
};


exports.deleteProductCountingRow = async (req, res) => {
    const { id } = req.params;
try {
    const productCounting = await productCountingModel.findById(id);

        if (!productCounting) {
            return res.status(404).json({
                success: false,
                message: 'No productCounting  found with the provided id',
            });
        }

        await productCountingModel.findByIdAndDelete(id);

        res.status(200).json('item deleted successfully');
       

    }catch(e) {
        console.log(e.message);
        res.status(500).json({success : false, message : 'Internal serverError'});
        
    }

};