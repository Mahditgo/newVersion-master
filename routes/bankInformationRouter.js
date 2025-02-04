const {Router} = require('express');
const bankInfoController = require('./../controllers/banckInformationController');
const router = Router();

// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
router.post('/:reportId', bankInfoController.createBackInfo);
router.get('/:reportId', bankInfoController.getBankInfoDetails);
router.delete('/:id', bankInfoController.deleteBankInfo);
router.patch('/items/:itemId', bankInfoController.updateBankInfo);
router.delete('/:id/items/:itemId', bankInfoController.deleteBankInfoRow)


module.exports = router;