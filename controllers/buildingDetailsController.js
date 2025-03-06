const BuildingDetails = require('../models/buildingDetailsModel')
const factory = require('./handlerFactory');

//upload
exports.createBuildingDetails = factory.create(BuildingDetails);

//get
exports.getBuildingDetails = factory.getByReportId(BuildingDetails);

//delete
exports.deleteBuilding = factory.delete(BuildingDetails);

//deleteRow
exports.deleteBuildingRow = factory.deleteRow(BuildingDetails);