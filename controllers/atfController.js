
const atfModel = require('./../models/atfModel')

exports.createAtf = async (req, res) => {
    const { reportId } = req.params;
    const { titleAtf, id_row, endAtf } = req.body;
    
    console.log("Received body:", req.body);

    try {
        if (!reportId || !titleAtf || !id_row || !endAtf) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newItem = { id_row, endAtf };

        let result;
        // جستجوی موجودیت با reportId و titleAtf
        const existingConsumption = await atfModel.findOne({ reportId, titleAtf });

        if (existingConsumption) {
            // افزودن آیتم جدید به لیست موجود
            existingConsumption.items.push(newItem);
            console.log("Before saving:", JSON.stringify(existingConsumption, null, 2));
            result = await existingConsumption.save();
        } else {
            // ایجاد سند جدید در صورتی که وجود نداشت
            const newConsumption = new atfModel({
                reportId,
                titleAtf,
                items: [newItem]
            });
            console.log("Before saving:", JSON.stringify(newConsumption, null, 2));
            result = await newConsumption.save();
        }

        console.log("Saved result:", result);
        res.status(201).json(result);

    } catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



exports.getAtf = async (req, res) => {
    const { reportId } = req.params;

    try {
        
        if(!reportId) {
            return res.status(400).json({
                success : false,
                message : "reposrtId is required"
            })
        }
        //     let { user } = req
    // let { activeReport } = user
    // if(!activeReport){
    //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    // }
    

        
        const records = await atfModel.findOne({reportId  }); 

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


exports.updateAtf= async (req, res) => {
    const { row_id } = req.params;
    const updatesFields = req.body;

    try {

        if (!row_id) {
            return res.status(400).json({ message: 'reportID and itemId are required' });
        }

        if (Object.keys(updatesFields).length === 0) {
            return res.status(400).json({ message: 'No fields valid for update' });
        }

        const updateQuery = Object.keys(updatesFields).reduce((acc, key) => {
            acc[`items.$.${key}`] = updatesFields[key];
            return acc;
        }, {});

        const updatecompany = await atfModel.findOneAndUpdate(
            {
                      
                 "items.id_row": row_id , 
            },
            {
                $set: updateQuery, 
            },
            {
                new: true,
            }
        );

        console.log(updateQuery);
        
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


// exports.deleteAtfRow = async (req, res) => {
//     const { row_id } = req.params;
// try {
//     const productCounting = await atfModel.findOne({"items.id.row":row_id});
//     console.log(productCounting);
    

//         if (!productCounting) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No productCounting  found with the provided id',
//             });
//         }

//         const result = await atfModel.updateOne(
//             { row_id: row_id },
//             { $pull: { items: { row_id : row_id } } }
//           );

//           if (result.modifiedCount  > 0) {
//             res.status(200).send({ message: 'Item deleted successfully!' });
//           } else {
//             res.status(404).send({ message: 'Item not found!' });
//           }

//     }catch(e) {
//         console.log(e.message);
//         res.status(500).json({success : false, message : 'Internal serverError'});
        
//     }

// }

exports.deleteAtfRow = async (req, res) => {
    const { row_id } = req.params;

    try {
        // بررسی وجود آیتم مورد نظر درون items
        const productCounting = await atfModel.findOne({ "items.id_row": row_id });

        if (!productCounting) {
            return res.status(404).json({
                success: false,
                message: 'No item found with the provided row_id',
            });
        }

        // حذف آیتم با استفاده از $pull
        const result = await atfModel.updateOne(
            { "items.id_row": row_id }, // جستجو درون آرایه
            { $pull: { items: { id_row: row_id } } } // حذف آیتم
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ success: true, message: 'Item deleted successfully!' });
        } else {
            res.status(404).json({ success: false, message: 'Item not found!' });
        }

    } catch (e) {
        console.error("Error deleting item:", e.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
