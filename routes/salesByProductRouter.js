const {Router} = require('express');
const salesByProductController = require('./../controllers/salesByProductController')
const { requireAuth } = require('./../middleswares/requireAuth')
const router = Router();
router.use(requireAuth);
router.get('/Product/:reportId', salesByProductController.getSalesByProduct);
router.get('/Buyer', salesByProductController.getSalesByProductsBuyer);
router.get('/ProductCode/:productCode/:reportId', salesByProductController.getProductBuyerByCode);


module.exports = router;