const {Router} = require('express');
const companyClaimsController = require('./../controllers/companyClaimsController');
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.post('/:reportId', companyClaimsController.createCompanyClaims);
router.get('/:reportId', companyClaimsController.getcompanyClaims);
router.delete('/:id', companyClaimsController.deletecompanyClaims);
router.delete('/:id/items/:itemId', companyClaimsController.deleteBankInfoRow);
router.patch('/:reportId/items/:itemId', companyClaimsController.updatecompanyClaims);





module.exports = router;