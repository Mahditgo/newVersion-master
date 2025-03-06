const MachinegDetails = require('../models/machineDetailsModel');
const factory = require('./handlerFactory');


//upload
exports.createMachineDetails = factory.create(MachinegDetails);


//get
exports.getMachingDetails = factory.getByReportId(MachinegDetails);

//delete
exports.deleteMachin = factory.delete(MachinegDetails);

//delete Row
exports.deleteMachinRow = factory.deleteRow(MachinegDetails);
