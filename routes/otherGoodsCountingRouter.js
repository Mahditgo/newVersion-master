const { Router } = require('express');
const upload = require('./../middleswares/upload')
const otherGoodsCountingController = require('./../controllers/otherGoodsCountingController');
const router = Router();

router.post('/',upload.single('file') , otherGoodsCountingController.uplaodotherGoodsCounting);
router.get('/:reportId', otherGoodsCountingController.getotherGoodCountingDetails);
router.delete('/:id' , otherGoodsCountingController.deleteOtherGoodCounting);
router.delete('/:id/items/:itemId', otherGoodsCountingController.deleteOtherGoodsCountingRow);



module.exports = router;