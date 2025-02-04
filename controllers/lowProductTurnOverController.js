
const Warehouse = require('./../models/WarehouseModel')



const getLowChangeItems = async (req, res) => {

    const { reportId } = req.params;
    try {
        const warehouses = await Warehouse.find({reportId});

        const filteredItems = warehouses.map(warehouse => {
            return {
                reportId: warehouse.reportId,
                matchingItems: warehouse.items
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
        }).filter(warehouse => warehouse.matchingItems.length > 0);
        

        res.status(200).json(filteredItems);
    } catch (error) {
        res.status(500).json({ message: "خطا در دریافت اطلاعات", error });
    }
};

module.exports = { getLowChangeItems };
