const { Router } = require('express');
const upload = require('./../middleswares/upload')
const productCountingController = require('./../controllers/productCountingController');
const router = Router();

router.post('/',upload.single('file') , productCountingController.uplaodProductCounting);
router.get('/:reportId', productCountingController.getproductCountingDetails);
router.delete('/:id' , productCountingController.deleteProductCounting);
router.delete('/:id/items/:itemId', productCountingController.deleteProductCountingRow);



module.exports = router;