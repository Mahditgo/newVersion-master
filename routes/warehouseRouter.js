const { Router } = require('express');
const warehosueController = require('./../controllers/wareHouseController')
const upload = require('../middleswares/upload');



const router = Router();

router.post("/upload/warehouse", upload.single("file"), warehosueController.UploadWarehouse);
router.get("/upload/warehouse/:reportId", warehosueController.getWareHouseData);
router.delete("/upload/warehouse/:id", warehosueController.deleteWarehouse);
router.delete('/upload/warehouse/:id/items/:itemId', warehosueController.deleteSalesRow)

module.exports = router;