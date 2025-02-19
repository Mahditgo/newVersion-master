const mongoose = require('mongoose');




const timesheetSchema = new mongoose.Schema({
    reportId : {
        type : String,
        required : true
    },
    items : [
        {
        userName : {
            type : String,
            // required : true
        },
        reportName : String,
        location : {
            type : String,
            // required : true
        },
        workDate : {
            type : Date,
            // required : true
        },
        workHours : [
            {
                hour: { type: Number,  },
                minutes: { type: Number,  },
                allocation : {
                    code : String,
                    title : String
                }
            }
        ],
        startTime: {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        endTime : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        wotkTime : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        dailyLeave : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        hourlyLeave : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        vacation : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        other : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        finalWork : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        standardTime : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        extraTime : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        },
        workDeficit : {
            hour: { type: Number,  },
            minutes: { type: Number,  }
        }
    }
   ]
});

const TimeSheet = mongoose.model('TimeSheet', timesheetSchema);
module.exports = TimeSheet;