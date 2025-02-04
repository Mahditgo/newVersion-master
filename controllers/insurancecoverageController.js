const InsurancecoverageModel = require('./../models/insurancecoverageModel')


exports.createInsurancecoverage = async(req, res) => {
    try {
        
        console.log(req.body);
        const { reportId } = req.body;
        const { propertyNumber, propertyTitle, purchaseDate, location, purchasePrice, endDepreciation, insurancecoverage, difference } = req.body;
        

        
        if (!reportId ||!propertyNumber || !propertyTitle || !purchaseDate || !location || !purchasePrice || !endDepreciation || !insurancecoverage || !difference) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        
        const newItem = {
            propertyNumber,
            propertyTitle,
            purchaseDate,
            location,
            purchasePrice,
            endDepreciation,
            insurancecoverage,
            difference
        };

       
        let result;
        const existingReport = await InsurancecoverageModel.findOne({ reportId });

        if (existingReport) {
           
            existingReport.items.push(newItem);
            result = await existingReport.save();
        } else {
            
            const newInsuranceCoverage = new InsurancecoverageModel({
                reportId,
                items: [newItem]
            });
            result = await newInsuranceCoverage.save();
        }
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};


exports.getinsurancecoverageDetails = async (req, res) => {
    try {
        
        const { reportId } = req.params;

        
        const records = await InsurancecoverageModel.find({reportId}); 

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

exports.deleteInsurancecoverage = async (req , res) => {
    const { id } = req.params;

    try {

        const product = await InsurancecoverageModel.findByIdAndDelete(id);
        if(!product)  {
            return res.status(404).json({success : false , message : 'Insurancecoverage not found'});
        };

        res.status(200).json({success: true, message: 'Insurancecoverage deleted successfully'})

    }catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error.' });
        

    }
};

exports.deleteInsurancecoverageRow = async (req, res) => {
    const { id, itemId } = req.params;
try {
    const productCounting = await InsurancecoverageModel.findById(id);

        if (!productCounting) {
            return res.status(404).json({
                success: false,
                message: 'No productCounting  found with the provided id',
            });
        }

        const result = await InsurancecoverageModel.updateOne(
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


// exports.deleteInsurancecoverageRow = async (req, res) => {
//     const { id, itemId } = req.params;
//     console.log(id , itemId);
    
// try {
//     const Insurancecoverage = await InsurancecoverageModel.findById(id);
//     console.log(Insurancecoverage);
    

//         if (!Insurancecoverage) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No Insurancecoverage  found with the provided id',
//             });
//         }

     

//         const result = await Insurancecoverage.updateOne(
//             { _id: id },
//             { $pull: { items: { _id: itemId } } }
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