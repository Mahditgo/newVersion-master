const OtherAssetsDetails = require('../models/otherAssetsDetailsModel');
const factory = require('./handlerFactory');

//uplaod
exports.createOtherAssetsDetails = factory.create(OtherAssetsDetails);

//get
exports.getOtherAssetsDetails = factory.getByReportId(OtherAssetsDetails);

//delete
exports.deleteOtherAssets = factory.delete(OtherAssetsDetails);

//deleteRow
exports.deleteOtherAssetsRow = factory.deleteRow(OtherAssetsDetails);