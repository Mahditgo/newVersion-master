const LandDetails = require('../models/landDetailsModel');
const factory = require('./handlerFactory');


//upload exel
exports.createLandDetails = factory.create(LandDetails);

//get 
exports.getLandDetails = factory.getByReportId(LandDetails);

//delete
exports.delelteLandDetails = factory.delete(LandDetails);

//dellete Row
exports.deleteLandDetailsRow = factory.deleteRow(LandDetails);
