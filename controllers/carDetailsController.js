const CarDetails = require('../models/carDetailsModel');
const factory = require('./handlerFactory');

//uplaod
exports.createCarDetails = factory.create(CarDetails);

//get
exports.getCarDetails = factory.getByReportId(CarDetails);

//delete
exports.deleteCarDetails = factory.delete(CarDetails);

//deleteRow
exports.deleteCarRow = factory.deleteRow(CarDetails);