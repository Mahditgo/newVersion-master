const warehouseModel = require('./../models/WarehouseModel');


exports.getStagnationProduct = async (req, res) => { 
    const { reportId } = req.params;

    try {

        const products = await warehouseModel.find({reportId});
        console.log(products);
        

        const filterItems  = products.map(product => {
            return {
                machingItems : product.items.filter(item => item.endNumber === item.firstNumber && item.endNumber !== 0)
                .map(item => ({
                    productCode: item.productCode,
                    productName: item.productName,
                    endNumber: item.endNumber,
                    endAmount: item.endAmount
                    })
                )
            }

        }).filter(product => product.machingItems.length > 0);

        if (filterItems.length === 0) {
            return res.status(404).json({ message: 'There is no stagnation Product' });
        }

        res.status(200).json(filterItems);

    }catch(e) {
        console.log(e.message);
        res.status(500).json('internal server error');
        
    }
}