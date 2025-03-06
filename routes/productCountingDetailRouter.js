const { Router } = require('express');
const upload = require('./../middleswares/upload')
const productCountingController = require('./../controllers/productCountingController');
const router = Router();
const { requireAuth } = require('./../middlewares/requireAuth')
router.use(requireAuth);

router.post('/', upload.single('file'), productCountingController.uplaodProductCounting);
router.get('/:reportId', productCountingController.getproductCountingDetails);
router.delete('/:reportId' , productCountingController.deleteProductCounting);
router.delete('/deleteRow/:id', productCountingController.deleteProductCountingRow);



module.exports = router;