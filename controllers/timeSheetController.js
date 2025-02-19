const TimeSheetModel = require('./../models/timeSheetModel')




const parseTime = (time) => {
    if (typeof time === 'string') {
        const [hour, minutes] = time.split(":").map(Number);
        return { hour: isNaN(hour) ? 0 : hour, minutes: isNaN(minutes) ? 0 : minutes };
    } else if (typeof time === 'object' && time !== null) {
        return { hour: Number(time.hour) || 0, minutes: Number(time.minutes) || 0 };
    }
    return { hour: 0, minutes: 0 };  
};


exports.createTimeSheet = async (req, res) => {
    const { reportId } = req.params;
    // let { user } = req
    // let { activeReport } = user
    // if(!activeReport){
    //     return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    // }
    const { 
        userName,
        reportName,
        location,
        workDate,
        startTime,
        endTime,
        wotkTime,
        dailyLeave,
        hourlyLeave,
        vacation,
        other,
        finalWork,
        standardTime,
        extraTime,
        workDeficit,
        workHours
    } = req.body;

   
    console.log('Incoming Request Body:', req.body);

    try {
      

        const newTimesheet = {
            userName,
            reportName,
            location,
            workDate,
            startTime: parseTime(startTime),
            endTime: parseTime(endTime),
            wotkTime: parseTime(wotkTime),
            dailyLeave: parseTime(dailyLeave),
            hourlyLeave: parseTime(hourlyLeave),
            vacation: parseTime(vacation),
            other: parseTime(other),
            finalWork: parseTime(finalWork),
            standardTime: parseTime(standardTime),
            extraTime: parseTime(extraTime),
            workDeficit: parseTime(workDeficit),
            workHours: workHours.map(wh => ({
                hour: parseTime(wh.hour).hour,  
                minutes: parseTime(wh.minutes).minutes,
                allocation: wh.allocation || { code: null, title: "" }
            }))
        };
        
        console.log('New Timesheet:', newTimesheet); 

        let result;
        const existingTimesheet = await TimeSheetModel.findOne({ reportId });

        if (existingTimesheet) {
           
            existingTimesheet.items.push(newTimesheet);
            result = await existingTimesheet.save();
        } else {
            
            const newTimeShhet = new TimeSheetModel({
                reportId ,
                items: [newTimesheet]
            });
            result = await newTimeShhet.save();
        }

        console.log('Saved Result:', result); 
        res.json(result);
    } catch (e) {
        console.error('Error saving time sheet:', e.message); 
        res.status(500).json({ message: "خطا در ایجاد تایم‌شییت", error: e.message });
    }
};




exports.createworkHoures = async (req, res) => {
    let { user } = req
    let { activeReport } = user
    if(!activeReport){
        return res.status(400).json({ error: 'نسبت به انتخاب واحد مورد گزارش دیگری اقدام نمایید' })
    }
    const { hour, minutes, title } = req.body;

    try {
        const newWorkHour = {
            hour,
            minutes,
            allocation: { title }
        };

        let result;
        const existingTimesheet = await TimeSheetModel.findOne({ reportId : activeReport });

        if (existingTimesheet) {
            
            const lastItem = existingTimesheet.items[existingTimesheet.items.length - 1];

            if (lastItem) {
                lastItem.workHours.push(newWorkHour);
            } else {
                
                existingTimesheet.items.push({ workHours: [newWorkHour] });
            }

            result = await existingTimesheet.save();
        } else {
            
            const newTimeSheet = new TimeSheetModel({
                reportId : activeReport,
                items: [{ workHours: [newWorkHour] }]
            });
            result = await newTimeSheet.save();
        }

       
        const filteredItems = result.items.map(item => ({
            workHours: item.workHours.map(workHour => ({
                hour: workHour.hour,
                minutes: workHour.minutes,
                title: workHour.allocation.title
            }))
        }));

        res.json({ reportId: activeReport, items: filteredItems });
    } catch (e) {
        console.error('Error saving work hours:', e.message);
        res.status(500).json({ message: "خطا در ایجاد تایم‌شییت", error: e.message });
    }
};






exports.updateTimeSheet = async (req, res) => {
    const { itemId } = req.params;  
    const updateFields = req.body; 

  
    const parseTime = (timeString) => {
        if (typeof timeString === "string" && timeString.includes(":")) {
            const [hour, minutes] = timeString.split(":").map(Number);
            return { hour, minutes };
        }
        return timeString;  
    };

    try {
       
        Object.keys(updateFields).forEach((key) => {
            if (typeof updateFields[key] === "string" && updateFields[key].includes(":")) {
                updateFields[key] = parseTime(updateFields[key]);
            }
        });

      
        const result = await TimeSheetModel.findOneAndUpdate(
            { "items._id": itemId },  
            { $set: Object.keys(updateFields).reduce((acc, key) => {
                acc[`items.$.${key}`] = updateFields[key];  
                return acc;
            }, {})},  
            { new: true }  
        );

        if (!result) {
            return res.status(404).json({ message: "آیتم موردنظر پیدا نشد" });
        }

        res.json(result);  
    } catch (e) {
        console.error('Error updating time sheet:', e.message);
        res.status(500).json({ message: "خطا در بروزرسانی تایم‌شییت", error: e.message });
    }
};






exports.updateWorkHours = async (req, res) => {
    const { itemId, workHourId } = req.params;
    const updateFields = req.body;

    
    if (updateFields.hour) {
        const parsedTime = parseTime(updateFields.hour);
        updateFields.hour = parsedTime.hour;
        updateFields.minutes = parsedTime.minutes;
    }

    try {
        const result = await TimeSheetModel.findOneAndUpdate(
            { "items._id": itemId, "items.workHours._id": workHourId },  
            { $set: { 
                "items.$[item].workHours.$[wh].hour": updateFields.hour,
                "items.$[item].workHours.$[wh].minutes": updateFields.minutes,
                "items.$[item].workHours.$[wh].allocation": updateFields.allocation
            }},
            { 
                arrayFilters: [
                    { "item._id": itemId }, 
                    { "wh._id": workHourId }
                ],
                new: true
            }
        );

        if (!result) {
            return res.status(404).json({ message: "رکورد موردنظر پیدا نشد" });
        }

        res.json(result);
    } catch (e) {
        console.error('Error updating workHours:', e.message);
        res.status(500).json({ message: "خطا در بروزرسانی workHours", error: e.message });
    }
};



exports.deleteItem = async (req, res) => {
    const { itemId } = req.params; 

    try {
        const result = await TimeSheetModel.findOneAndUpdate(
            { "items._id": itemId },  
            { $pull: { items: { _id: itemId } } }, 
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "آیتم موردنظر پیدا نشد" });
        }

        res.json({ message: "آیتم با موفقیت حذف شد", result });
    } catch (e) {
        console.error("Error deleting item:", e.message);
        res.status(500).json({ message: "خطا در حذف آیتم", error: e.message });
    }
};

;


exports.deleteWorkHour = async (req, res) => {
    const { itemId, workHourId } = req.params; 

    try {
        const result = await TimeSheetModel.findOneAndUpdate(
            { "items._id": itemId },  
            { $pull: { "items.$.workHours": { _id: workHourId } } }, 
            { new: true } 
        );

        if (!result) {
            return res.status(404).json({ message: "آیتم یا ساعت کاری موردنظر پیدا نشد" });
        }

        res.json({ message: "ساعت کاری با موفقیت حذف شد", result });
    } catch (e) {
        console.error("Error deleting workHour:", e.message);
        res.status(500).json({ message: "خطا در حذف ساعت کاری", error: e.message });
    }
};


exports.getTimeSheet = async (req, res) => {
    const { reportId } = req.params;

    try {
        const timeSheet = await TimeSheetModel.findOne({ reportId });

        if (!timeSheet) {
            return res.status(404).json({ message: "تایم‌شیت پیدا نشد" });
        }

        
        const formatTime = (time) => {
            if (!time || typeof time.hour !== 'number' || typeof time.minutes !== 'number') {
                return "00:00";
            }
            const hh = String(time.hour).padStart(2, "0");  
            const mm = String(time.minutes).padStart(2, "0"); 
            return `${hh}:${mm}`;
        };

        
        const formattedTimeSheet = {
            ...timeSheet._doc,  
            items: timeSheet.items.map(item => ({
                ...item._doc,
                startTime: formatTime(item.startTime),
                endTime: formatTime(item.endTime),
                wotkTime: formatTime(item.wotkTime),
                dailyLeave: formatTime(item.dailyLeave),
                hourlyLeave: formatTime(item.hourlyLeave),
                vacation: formatTime(item.vacation),
                other: formatTime(item.other),
                finalWork: formatTime(item.finalWork),
                standardTime: formatTime(item.standardTime),
                extraTime: formatTime(item.extraTime),
                workDeficit: formatTime(item.workDeficit),
                workHours: item.workHours.map(wh => ({
                    ...wh._doc,
                    hour: formatTime({ hour: Number(wh.hour), minutes: Number(wh.minutes) })  
                }))
            }))
        };

        res.json(formattedTimeSheet);
    } catch (e) {
        console.error('خطا در دریافت تایم‌شیت:', e.message);
        res.status(500).json({ message: "خطا در دریافت تایم‌شیت", error: e.message });
    }
};


