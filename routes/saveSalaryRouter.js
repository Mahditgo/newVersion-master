const { Router } = require('express');
const upload = require('../middleswares/upload');
const SaveSalaryController = require('../controllers/SaveSalaryController');
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router.post('/', upload.single('file'), SaveSalaryController.uplaodSaveSalary);
router.get('/:reportId', SaveSalaryController.getSaveSalary);
router.delete('/:id',   SaveSalaryController.deleteSaveSalary)
router.delete('/:id/items/:itemId', SaveSalaryController.deleteSaveSalaryRow);




module.exports = router;