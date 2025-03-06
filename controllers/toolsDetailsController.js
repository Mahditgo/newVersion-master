
const ToolsDetails = require('../models/toolsDetailsModel');
const factory = require('./handlerFactory');


//upload
exports.createToolsDetails = factory.create(ToolsDetails);


//get
exports.getToolsDetails = factory.getByReportId(ToolsDetails);

//delete
exports.deleteTools = factory.delete(ToolsDetails);

//delete Row
exports.deleteToolsRow = factory.deleteRow(ToolsDetails);