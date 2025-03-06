const FacilitiesDetails = require('../models/facilitiesDetailsModel');
const factory = require('./handlerFactory');


//upload
exports.createFacilitesDetails = factory.create(FacilitiesDetails);

//get
exports.getFacilitiesDetails = factory.getByReportId(FacilitiesDetails);

//delete
exports.deleteFacilites = factory.delete(FacilitiesDetails);

//deleteRow
exports.deleteFacilitesRow = factory.deleteRow(FacilitiesDetails);