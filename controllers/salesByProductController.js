const SalesDetail = require('./../models/salesDetailsModel');



exports.getSalesByProduct = async (req, res) => {
    // const { reportId } = req.params;

    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }

    try {

        const salesDetail = await SalesDetail.findOne({ reportId : activeReport }).lean();

        if(!salesDetail) { 
            return res.status(404).json("there is no salesDatails with that reportId");

        }
        // console.log(salesDetail);
        

        const salesByProduct = await SalesDetail.aggregate([
            { $unwind : "$items"},
            {
                $group : {
                    _id : "$items.productCode",
                    productName : { $first : "$items.productName"},
                    unit : { $first : "$items.unit"},
                    amount : { $sum : "$items.amount"},
                    salesAmount : { $sum : "$items.salesAmount"},
                    addedValue : { $sum : "$items.AddedValue"},
                    finalAmount : { $sum : "$items.finalAmount"},
                    count : { $sum : 1}
                }
            },
            
            {
                $match : { count : {$gte : 1}}
            },
            {
                $project : {
                    _id : 0,
                    productCode : "$_id",
                    productName : 1,
                    unit : 1,
                    amount : "$amount",
                    salesAmount :  "$salesAmount",
                    addedValue : "$addedValue",
                    finalAmount : "$finalAmount",
                    rat : {
                        $cond : {
                            if : { $eq: ["$salesAmount", 0]},
                            then : 0,
                            else : { $divide: ["$salesAmount", "$amount"]}
                        }
                    },
                    count : 1
                }
            }
        ]);
        // console.log(salesByProduct);
        

        res.status(200).json({
            reportId : activeReport,
            salesByProduct })
        
        

      

    }catch(e) {
        console.log(e.message);
        res.status(505).json("internal server error")
    }
}






exports.getSalesByProductsBuyer = async (req, res) => {
    // let { user } = req
    // let { activeReport } = user
    // if(!activeReport){
    //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    // }

    const { reportId } = req.params;

    try {

        const salesDetail = await SalesDetail.findOne({ reportId }).lean();

        if(!salesDetail) { 
            return res.status(404).json("there is no salesDatails with that reportId");

        }
        // console.log(salesDetail);
        

        const salesByProduct = await SalesDetail.aggregate([
            { $unwind : "$items"},
            {
                $group : {
                    _id : {
                       
                       buyerCode : "$items.BuyerDetailCode"
                    },
                    productCode : { $first : "$items.productCode"},
                    buyerName : { $first : "$items.buyersName"},
                    productName : { $first : "$items.productName"},
                    unit : { $first : "$items.unit"},
                    amount : { $sum : "$items.amount"},
                    salesAmount : { $sum : "$items.salesAmount"},
                    addedValue : { $sum : "$items.AddedValue"},
                    finalAmount : { $sum : "$items.finalAmount"},
                    count : { $sum : 1}
                }
            },
            
            {
                $match : { count : {$gte : 1}}
            },
            {
                $project : {
                    _id : 0,
                    
                    productCode : 1,
                    buyerCode : "$_id.buyerCode",
                    buyerName : 1,
                    productName : 1,
                    unit : 1,
                    amount : "$amount",
                    salesAmount :  "$salesAmount",
                    addedValue : "$addedValue",
                    finalAmount : "$finalAmount",
                    rat : {
                        $cond : {
                            if : { $eq: ["$salesAmount", 0]},
                            then : 0,
                            else : { $divide: ["$salesAmount", "$amount"]}
                        }
                    },
                    count : 1
                }
            }
        ]);

        
        // console.log(salesByProduct);
        

        res.status(200).json({
            reportId ,
            salesByProduct})
        
        

      

    }catch(e) {
        console.log(e.message);
        res.status(505).json("internal server error")
    }
}




exports.getProductBuyerByCode = async (req, res) => {
    const { reportId, productCode } = req.params;

    try {
        const salesDetail = await SalesDetail.findOne({ reportId }).lean();
        if (!salesDetail) {
            return res.status(404).json("No salesDetails found with that reportId");
        }

    
        console.log(salesDetail);

        const matchStage = { reportId };

        if (productCode) {
            
            matchStage["items.productCode"] = productCode.toString();
        }

        const salesByProduct = await SalesDetail.aggregate([
            { $match: matchStage },
            { $unwind: "$items" },
            { 
                $match: {
                    "items.productCode": productCode.toString() 
                }
            },
            {
                $group: {
                    _id: { buyerCode: "$items.BuyerDetailCode" },
                    productCode: { $first: "$items.productCode" },
                    buyerName: { $first: "$items.buyersName" },
                    productName: { $first: "$items.productName" },
                    unit: { $first: "$items.unit" },
                    amount: { $sum: "$items.amount" },
                    salesAmount: { $sum: "$items.salesAmount" },
                    addedValue: { $sum: "$items.AddedValue" },
                    finalAmount: { $sum: "$items.finalAmount" },
                    count: { $sum: 1 }
                }
            },
            { $match: { count: { $gte: 1 } } },
            {
                $project: {
                    _id: 0,
                    productCode: 1,
                    buyerCode: "$_id.buyerCode",
                    buyerName: 1,
                    productName: 1,
                    unit: 1,
                    amount: 1,
                    salesAmount: 1,
                    addedValue: 1,
                    finalAmount: 1,
                    rat: {
                        $cond: {
                            if: { $eq: ["$salesAmount", 0] },
                            then: 0,
                            else: { $divide: ["$salesAmount", "$amount"] }
                        }
                    },
                    count: 1
                }
            }
        ]);

        console.log(salesByProduct); 

        if (salesByProduct.length === 0) {
            return res.status(404).json({ message: "No sales data found for the provided reportId and productCode" });
        }

        res.status(200).json({ reportId, productCode, salesByProduct });

    } catch (e) {
        console.log(e.message);
        res.status(500).json("internal server error");
    }
};
