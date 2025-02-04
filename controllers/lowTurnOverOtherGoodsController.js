
const otehrGoodsModel = require('./../models/otherGoodsModel')



const getLowTurnOtherGoods = async (req, res) => {

    const { reportId } = req.params;
    try {
        const otherGoods = await otehrGoodsModel.find({reportId});

        const filteredItems = otherGoods.map(otehrGood => {
            return {
                reportId: otehrGood.reportId,
                matchingItems: otehrGood.items
                    .filter(item => {
                        if (item.firstNumber !== 0 && item.endNumber !== 0) {
                            const calc = Math.abs((item.endNumber - item.firstNumber) / item.firstNumber);
                            console.log(`Product: ${item.productCode}, Ratio: ${calc}`);
                            return calc < 0.05;
                        }
                        return false;
                    })
                    .map(item => ({
                        productCode: item.productCode,
                        productName: item.productName,
                        endNumber: item.endNumber,
                        endAmount: item.endAmount
                    }))
            };
        }).filter(otherGood => otherGood.matchingItems.length > 0);
        

        res.status(200).json(filteredItems);
    } catch (error) {
        res.status(500).json({ message: "خطا در دریافت اطلاعات", error });
    }
};

module.exports = { getLowTurnOtherGoods };
