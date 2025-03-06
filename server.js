const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan')

// import messageRoutes from "./routes/message.route.js";
const messageRoutes = require('./routes/message.route.js');
// import { app, server } from "./lib/socket.js";
const { app, server } = require('./lib/socket.js');


const authRoutes                = require('./routes/authRoutes')
const userRouter                = require('./routes/userRouter')

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
const conssumptionControlViewRoutes = require('./routes/consumptionControlViewRoutes');
const timeSheetRoutes = require('./routes/timeSheetRouter');
const contradictionRoutes = require('./routes/contradictionRouter');
const salesByProductRotes = require('./routes/salesByProductRouter');
const getRateDifferenceRoutes = require('./routes/getRateDifferenceRoutesRouter');
const getNegativeRateDifferenceRoutes = require('./routes/getNegativeRateDifferenceRouter');
const projectWorkProgeressRoutes = require('./routes/projectWorkProgeressRouter');
const propertyDescriptionRoutes   = require('./routes/propertyDescriptionRouter');
const saveSalaryRoutes       =  require('./routes/saveSalaryRouter');
const fixedAssetRoutes         =  require('./routes/fixedAssetRouter'); ////
const landDetailsRoutes        =  require('./routes/landDetailsRouter');
const buildingDetailsRoutes         =  require('./routes/buildingDetailsRouter');
const furnitureDetailsRoutes    = require('./routes/furnitureDetailsRouter');
const machineDetailsRoutes      = require('./routes/machineDetailsRouter');
const facilitiesDetailsRoutes   = require('./routes/facilitiesDetailsRouter');
const toolsDetailsRoutes        = require('./routes/toolsDetailsRouter');
const carDetailsRoutes          = require('./routes/carDetailsRouter');
const otherAssetsDetailsRoutes  = require('./routes/otherAssetsRouter');
const buildingDiscreptionRotes  = require('./routes/buildingDescriptionRouter');
const furnitureDiscreption      = require('./routes/furnitureDiscreptionRoutre');
const machineDescription         = require('./routes/getMachinDescripancyRouter');
const getFacilitesDescription    = require('./routes/getFacilitesRouter');
const getCarDescriptionRotes    = require('./routes/getCarDescriptionRouter');
const getToolsDescriptionRoutes = require('./routes/getToolsDescriptionRouter');
const getOtherAssetsDescription  = require('./routes/getOtherAssetsDescriptionRoute');


 


const lowProductRoutes = require('./routes/lowProductTurnOverRouter');
const lowTurnOverMaterialsRoutes = require('./routes/lowTurnOverMaterialsRouter');
const lowTurnOverOtherGoodsRoutes = require('./routes/lowTurnOverOthreGoodsRouter');


const insurancecoverageRoutes = require('./routes/insurancecoverageRouter');
const bankInfoRouts = require('./routes/bankInformationRouter');
const companyClaimsRotes = require('./routes/companyClaimsRouter');
const consumptionRoutes = require('./routes/consumptionControllerRouter');
const apporovalSaleRoutes = require('./routes/apporovalSaleRouter');
const  supportRoutes = require('./routes/supportRouter');
const budjetProjectRoutes = require('./routes/budjectProjectRouter');
const groupMessageRoutes  = require('./routes/groupMessageRouter')

const atfRoutes = require('./routes/atfRouter')

dotenv.config();


// const app = express();
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

app.use('/api/productCountingDetails2', productCountingDetailsRoutes);

app.use('/api/auth',                    authRoutes)
app.use('/api/users',                   userRouter)
app.use("/api/messages",                messageRoutes);

app.use('/api/sales',                 salesRouter);
app.use('/api/warehouse',             warehouseRouter);
app.use('/api/materialdetails',       materialdetailsRouts);
app.use('/api/propertyDetails',       propertyDetailsRoutes);
app.use('/api/otherGoods',            otherGoodsRoutes);
app.use('/api/productionsDetails',     productionDetailsRoutes);
// app.use('/api/productCountingDetails', productCountingDetailsRoutes);
app.use('/api/productDiscrepancy',      discrepancyRoutesRouter);
app.use('/api/salesDiscrepancy',      salesDiscrepancyRoutes);
app.use('/api/productionDiscrepancy', productionDiscrepancyRoutes);
app.use('/api/materialCounting',      materialCountingRotes);
app.use('/api/otherGoodsCounting',    otherGoodsCountingsRoutes);
app.use('/api/materialDiscrepancy',   materialDiscrepancy);
app.use('/api/otherGoodsDiscrepancy', otherGoodsDiscrepancyRoutes);
app.use('/api/consumptionControlView', conssumptionControlViewRoutes);
app.use('/api/contradiction',         contradictionRoutes);
app.use('/api/salesBuyProduct',        salesByProductRotes);
app.use("/api/getRateDifference",     getRateDifferenceRoutes);
app.use('/api/getNegativeRateDiffrence',  getNegativeRateDifferenceRoutes);
app.use('/api/projectWorkProgeress',   projectWorkProgeressRoutes);
app.use('/api/propertyDescription',    propertyDescriptionRoutes);
app.use('/api/saveSalary',                saveSalaryRoutes);
app.use('/api/fixedAsset',             fixedAssetRoutes);
app.use('/api/landDetails',           landDetailsRoutes);
app.use('/api/builingDetails',         buildingDetailsRoutes);
app.use('/api/furnitureDetails',       furnitureDetailsRoutes);
app.use('/api/machineDetails',        machineDetailsRoutes);
app.use('/api/facilitiesDetails',     facilitiesDetailsRoutes);
app.use('/api/toolsDetails',          toolsDetailsRoutes);
app.use('/api/carDetails',            carDetailsRoutes);
app.use('/api/otherAssetsDetails',    otherAssetsDetailsRoutes);
app.use('/api/getBuildingDiscreption',   buildingDiscreptionRotes);
app.use('/api/getFurnitureDiscreption',  furnitureDiscreption);
app.use('/api/getMachineDescription',      machineDescription);
app.use('/api/getFacilitesDescription',   getFacilitesDescription);
app.use('/api/getCarDescription',      getCarDescriptionRotes);
app.use('/api/getToolsDescription',    getToolsDescriptionRoutes);
app.use('/api/otherAssetsDescription',  getOtherAssetsDescription)
// app.use('api/consumptionControlView', consuptionControlViewRoutes)

//stagnations
app.use('/api/productStagnation', productStagnationRotes);
app.use('/api/materialStagnation', materialStagnationRoutes);
app.use('/api/otherGoodsStagnation', otherGoodsStagnationRotes);
app.use('/api/timesheet',          timeSheetRoutes);
app.use('/api/budjetProject',      budjetProjectRoutes)


app.use('/api/lowProductTurnOver', lowProductRoutes);
app.use('/api/lowTurnOverMaterials', lowTurnOverMaterialsRoutes);
app.use('/api/lowTurnOverOtherGoods', lowTurnOverOtherGoodsRoutes);

app.use('/api/atf', atfRoutes)



//invaluation Imports
app.use('/api/insurancecoverage',   insurancecoverageRoutes);
app.use('/api/bankinformation',     bankInfoRouts);
app.use('/api/companyClaims',       companyClaimsRotes);
app.use('/api/consumptionControl',  consumptionRoutes);
app.use('/api/apporovalSale',       apporovalSaleRoutes);
app.use("/api/support",             supportRoutes);
app.use('/api/groupMessage',        groupMessageRoutes)

// app.use('/api/audit', auditRoutes)



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); 
});




