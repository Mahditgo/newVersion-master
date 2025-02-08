const {Router} = require('express');
const discrepanciesController = require('./../controllers/test')
const router = Router();

router.patch('/', discrepanciesController.updateAccountingParty);

module.exports = router;