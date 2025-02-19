const mongoose =  require('mongoose')

const discrepancySchema = new mongoose.Schema({
    productCode: String,
    productName: String,
    productionQuantity: Number,
    materialCode: String,
    materialName: String,
    unit: String,
    coefficient: Number,
    ConsumableQuantity: Number,
  });
  
  const Discrepancy = mongoose.model('Discrepancy', discrepancySchema);
  module.exports = Discrepancy
  