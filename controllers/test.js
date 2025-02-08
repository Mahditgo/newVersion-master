// const MainAudit = require('./../models/MainAudit');


// exports.updateAccountingParty = async (req, res) => {
//     const { control, accountParty } = req.body;

//     let { user } = req
//     let { activeReport } = user
//     if(!activeReport){
//         return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
//     }

//     try {

//         const updateAt = typeof accountParty === "string" ? { accountParty} : accountParty;

//         const update = await MainAudit.findOneAndUpdate(
//             {control},
//             {$set : updateAt},
//             {new : true}
//         )

//         if(!update) {
//             return res.status(404).json({success : false, message : 'There is not MinAudit with that Id'})
//         }

//         res.json(update);

//     }catch(e) {
//         console.log(e.message);
//         res.status(500).json({success : false, message : 'internal server error'})
//     }
// }


const updateAccountingParty = async (req, res) => {
    const { control, accountParty } = req.body;
    console.log(control)
    console.log(accountParty)
    console.log(req.body);

    let { user } = req
        let { activeReport } = user
        if(!activeReport){
            return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
        }

    
    try {

        // const updateAt = typeof accountParty === "string" ? { accountParty} : accountParty;

        const update = await MainAudit.findOneAndUpdate(
            {id:control},
            {$set : accountParty},
            {new : true}
        )

        if(!update) {
          return  res.status(404).json({success : false, message : 'There is not MinAudit with that Id'})
        }

        res.json(update);
        
    }catch(e) {
        console.log(e.message);
        res.status(500).json({success : false, message : 'internal server error'})
    }
}

