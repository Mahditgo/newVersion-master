
const FurnitureDetails = require('../models/furnitureDetailsModel');
const factory = require('./handlerFactory');

//uplaod
exports.createFurnitureDetails = factory.create(FurnitureDetails);

//get
exports.getFurnitureDetails = factory.getByReportId(FurnitureDetails);

//delete
exports.deleteFurniture = factory.delete(FurnitureDetails);

//deleteRow
exports.deleteFurnitureRow = factory.deleteRow(FurnitureDetails);