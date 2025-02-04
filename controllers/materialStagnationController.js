const materialModel = require('./../models/materialDetailsModel');


exports.getStagnationMaterial = async (req, res) => { 
    const { reportId } = req.params;

    try {

        const materials = await materialModel.find({reportId});
        console.log(materials);
        

        const filterItems  = materials.map(material => {
            return {
                machingItems : material.items.filter(item =>  item.endNumber === item.firstNumber && item.endNumber !== 0)
                
                .map(item => ({
                    productCode: item.productCode,
                    productName: item.productName,
                    endNumber: item.endNumber,
                    endAmount: item.endAmount
                    })
                )
            }

        }).filter(material => material.machingItems.length > 0);

        if (filterItems.length === 0) {
            return res.status(404).json({ message: 'There is no stagnation Material' });
        }

        res.status(200).json(filterItems);

    }catch(e) {
        console.log(e.message);
        res.status(500).json('internal server error');
        
    }
}