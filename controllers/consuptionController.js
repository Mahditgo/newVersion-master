
const consumptionModel = require('./../models/consumptionControlModel')

exports.createConsuption = async (req, res) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }
    const { productCode,
            productName,
            materialCode,
            materialName,
            unit,
            coefficient
     } = req.body;


    // console.log(req.body);
    
    try {
        
        if ( !productCode || !productName || !materialCode || !materialName || !unit || coefficient == null) {
            return res.status(400).json({ message: "اطلاعات ورودی ناقص است." });
        }

        const newConsumption = {
            productCode,
            productName,
            materialItems : [
                {
                    materialCode,
                    materialName,
                    unit,
                    coefficient
                }
            ]
        };
        // console.log(newConsumption);

        let result;
        const existingConsumption = await consumptionModel.findOne({reportId : activeReport});
        // console.log(existingConsumption);
        
        if(existingConsumption) {
            let consumption = existingConsumption.items.find(item => item.productCode === productCode);
            if(consumption) {
                consumption.materialItems.push({ materialCode, materialName, unit, coefficient });
                result = await existingConsumption.save();
            }else {
            existingConsumption.items.push(newConsumption);
            result = await existingConsumption.save();
            }
        } else {
            const newConsumptions= new consumptionModel({
                reportId : activeReport,
                items : [newConsumption]
            });
            result = await newConsumptions.save();
        }
        console.log(result);
        

        res.status(201).json(result)


    }catch(e) {
        console.log('error in creating consumption', e.message);
        res.status(500).json('server error');
        
    }
}


exports.getConsuptionControl = async (req, res) => {
    try {
        
        let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }

        // if(!reportId) {
        //     return res.status(400).json({
        //         success : false,
        //         message : "reposrtId is required"
        //     })
        // }

        
        const records = await consumptionModel.findOne({reportId : activeReport }); 

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



exports.deletecompanyClaims = async (req , res) => {
    const { id } = req.params;

    try {

        const records = await consumptionModel.findByIdAndDelete(id);
        if(!records)  {
            return res.status(404).json({success : false , message : 'consuption not found'});
        };

        res.status(200).json({success: true, message: 'consuption deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};


exports.deleteConsumptionRow = async (req, res) => {
    const { materialId } = req.params;
try {
 
    

    const result = await consumptionModel.updateOne(
        { "items.materialItems._id": materialId }, 
        { $pull: { "items.$[].materialItems": { _id: materialId } } } 
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

exports.updateMaterialItem = async (req, res) => {
    const {  materialId } = req.params;
    const updateFields = req.body;

    try {
        // if (!itemId || !materialId) {
        //     return res.status(400).json({ message: "itemId و materialId الزامی هستند" });
        // }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "هیچ فیلدی برای آپدیت ارسال نشده است" });
        }

        
        const updateQuery = Object.keys(updateFields).reduce((acc, key) => {
            acc[`items.$.materialItems.$[mat].${key}`] = updateFields[key];
            return acc;
        }, {});

        
        const updatedDocument = await consumptionModel.findOneAndUpdate(
            { "items.materialItems._id": materialId },
            { $set: updateQuery },
            { 
                new: true,
                arrayFilters: [{ "mat._id": materialId }] 
            }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: "there is no document for update" });
        }

        res.status(200).json({
            message: "data updated successfully",
            data: updatedDocument,
        });

    } catch (e) {
        console.error(" error in update :", e.message);
        res.status(500).json({ message: " server error", error: e.message });
    }
};


