const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')

const salesRouter = require('./routes/salesRouter');
const warehouseRouter = require('./routes/warehouseRouter');
const materialdetailsRouts = require('./routes/materialdetailRoutes');
const propertyDetailsRoutes = require('./routes/propertyDetailsRouter');
const otherGoodsRoutes = require('./routes/otherGoodsRouter');
const productionDetailsRoutes = require('./routes/productionDetailsRouter');
const productCountingDetailsRoutes = require('./routes/productCountingDetailRouter');
const discrepancyRoutesRouter = require('./routes/discrepancyRoutesRouter');
const salesDiscrepancyRoutes = require('./routes/salesDiscrepanctRouter');
const productStagnationRotes = require('./routes/productStagnationRouter');
const materialStagnationRoutes = require('./routes/materialStagnationRouter');
const otherGoodsStagnationRotes = require('./routes/otherGoodsStagnationRoter');
const productionDiscrepancyRoutes = require('./routes/productionDiscrepancyRouter');
const materialCountingRotes = require('./routes/materialCountingRouter');
const otherGoodsCountingsRoutes = require('./routes/otherGoodsCountingRouter');
const materialDiscrepancy = require('./routes/materialDiscrepancyRouter');
const otherGoodsDiscrepancyRoutes = require('./routes/otherGoodDiscrepancyRouter');
const conssumptionControlViewRoutes = require('./routes/consumptionControlViewRoutes')



const lowProductRoutes = require('./routes/lowProductTurnOverRouter');
const lowTurnOverMaterialsRoutes = require('./routes/lowTurnOverMaterialsRouter');
const lowTurnOverOtherGoodsRoutes = require('./routes/lowTurnOverOthreGoodsRouter');


const insurancecoverageRoutes = require('./routes/insurancecoverageRouter');
const bankInfoRouts = require('./routes/bankInformationRouter');
const companyClaimsRotes = require('./routes/companyClaimsRouter');
const consumptionRoutes = require('./routes/consumptionControllerRouter');
const apporovalSaleRoutes = require('./routes/apporovalSaleRouter')

const atfRoutes = require('./routes/atfRouter')

dotenv.config();


const app = express();
app.use(cors({
  origin :"http://localhost:5173" ,
  credentials : true
}));
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
   
    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1); 
  }
};

app.use('/api/sales',                 salesRouter);
app.use('/api/warehouse',             warehouseRouter);
app.use('/api/materialdetails',       materialdetailsRouts);
app.use('/api/propertyDetails',       propertyDetailsRoutes);
app.use('/api/otherGoods',            otherGoodsRoutes);
app.use('/api/productionsDetails',     productionDetailsRoutes);
app.use('/api/productCountingDetails', productCountingDetailsRoutes);
app.use('/api/productDiscrepancy',      discrepancyRoutesRouter);
app.use('/api/salesDiscrepancy',      salesDiscrepancyRoutes);
app.use('/api/productionDiscrepancy', productionDiscrepancyRoutes);
app.use('/api/materialCounting',      materialCountingRotes);
app.use('/api/otherGoodsCounting',    otherGoodsCountingsRoutes);
app.use('/api/materialDiscrepancy',   materialDiscrepancy);
app.use('/api/otherGoodsDiscrepancy', otherGoodsDiscrepancyRoutes);
app.use('/api/consumptionControlView', conssumptionControlViewRoutes)
// app.use('api/consumptionControlView', consuptionControlViewRoutes)

//stagnations
app.use('/api/productStagnation', productStagnationRotes);
app.use('/api/materialStagnation', materialStagnationRoutes);
app.use('/api/otherGoodsStagnation', otherGoodsStagnationRotes);


app.use('/api/lowProductTurnOver', lowProductRoutes);
app.use('/api/lowTurnOverMaterials', lowTurnOverMaterialsRoutes);
app.use('/api/lowTurnOverOtherGoods', lowTurnOverOtherGoodsRoutes);

app.use('/api/atf', atfRoutes)



//invaluation Imports
app.use('/api/insurancecoverage', insurancecoverageRoutes);
app.use('/api/bankinformation', bankInfoRouts);
app.use('/api/companyClaims', companyClaimsRotes);
app.use('/api/consumptionControl', consumptionRoutes);
app.use('/api/apporovalSale', apporovalSaleRoutes)

// app.use('/api/audit', auditRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); 
});
