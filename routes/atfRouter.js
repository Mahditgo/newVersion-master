const {Router} = require('express');
const atfController = require('./../controllers/atfController');
const router = Router();

// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
router.post('/:reportId', atfController.createAtf);
router.get('/:reportId', atfController.getAtf);
// router.delete('/:id', bankInfoController.deleteBankInfo);
router.patch('/items/:row_id', atfController.updateAtf);
router.delete('/items/:row_id', atfController.deleteAtfRow)


module.exports = router;


