const otherGoodsModel = require('./../models/otherGoodsModel');


exports.getStagnationOtherGoods = async (req, res) => { 
    const { reportId } = req.params;

    try {

        const otherGoods = await otherGoodsModel.find({reportId});
        console.log(otherGoods);
        

        const filterItems  = otherGoods.map(otherGood => {
            return {
                machingItems : otherGood.items.filter(item => item.endNumber === item.firstNumber && item.endNumber !== 0)
                .map(item => ({
                    productCode: item.productCode,
                    productName: item.productName,
                    endNumber: item.endNumber,
                    endAmount: item.endAmount
                    })
                )
            }

        }).filter(otherGood => otherGood.machingItems.length > 0);

        if (filterItems.length === 0) {
            return res.status(404).json({ message: 'There is no stagnation otherGoods' });
        }

        res.status(200).json(filterItems);

    }catch(e) {
        console.log(e.message);
        res.status(500).json('internal server error');
        
    }
}