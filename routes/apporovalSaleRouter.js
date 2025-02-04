const {Router} = require('express');
const approvalController = require('./../controllers/approvalSaleController')

const router = Router();


router.post('/:reportId', approvalController.createApprovalSale);
router.get('/:reportId', approvalController.getAllApprovals);
router.delete('/:id/items/:itemId', approvalController.deleteApprovalRow)


module.exports = router;