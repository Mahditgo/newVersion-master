
const moment = require('moment-jalaali');


function normalizeAndConvertToDate(input) {
    const match = input.match(/(\d{4})[\/\-.,]?(\d{1,2})[\/\-.,]?(\d{1,2})/);
    if (!match) return null;

    let [_, year, month, day] = match;
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    console.log('formattedDate' , formattedDate);
    
    return moment(formattedDate, 'jYYYY/jMM/jDD').toDate();
}



exports.getDiscreption = Model => async ( req, res) => {
    const { reportId, timeVar } = req.params;
    // const { timeVar } = req.body;


    try {
        
        const propertyDetails = await Model.findOne({ reportId }).select('-filePaths').lean();
        // console.log(propertyDetails);
        
        if(!propertyDetails) {
            return res.status(404).json("no propertyDetails Founded with that reportId");
        }
       



         console.log("TimeVar:", timeVar);
         const itemDate = normalizeAndConvertToDate(timeVar);
         if (!itemDate) {
             return res.status(400).json("Invalid time format");
         }
 
         console.log('Item Date:', itemDate);
             
        

        propertyDetails.items = propertyDetails.items.map(item => {

            const purchaseDate = normalizeAndConvertToDate(item.purchaseDate);
            if (!purchaseDate) {
                return { ...item, error: "Invalid purchase date" };
            }

            console.log('Purchase Date:', purchaseDate);

               
            const timeDiff = (itemDate - purchaseDate) / (1000 * 60 * 60 * 24) + 1;
            const timeInYears = timeDiff / 365;

            console.log('Time Difference in Days:', timeDiff);
            console.log('Time Difference in Years:', timeInYears);
            
                   
            
            if(item.descriptionMethod.includes("مستقیم")) {
                const straightAuditorDepreciation = (item.descriptionRate !== 0 ? item.purchasePrice / item.descriptionRate : 0) * timeInYears;
                return  {...item,
                    auditorDepreciation : straightAuditorDepreciation,
                    difference: straightAuditorDepreciation - item.periodDepreciation
                }
            } else if(item.descriptionMethod.includes("نزولی")) {
                   const DescendingAuditorDepreciation = ((item.bookValue !== 0 ? item.bookValue * item.descriptionRate : 0 ) / 100 ) * timeInYears;
                
                   
                return  {...item,
                    auditorDepreciation : DescendingAuditorDepreciation,
                    difference: DescendingAuditorDepreciation - item.periodDepreciation
                }

               } else {
                 return res.status(404).json('روش استهلاک درست نمیباشد')
               }
        
            });
                

        // console.log(propertyDetails);
        
        
        res.status(200).json(propertyDetails)

    } catch (error) {
        console.log(error.messsage);
        res.status(500).json("internal server error");
        
    }
}