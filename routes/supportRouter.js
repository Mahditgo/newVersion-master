const {Router} = require('express');
const supportController = require('./../controllers/supportController')

const router = Router();

router
.post('/', supportController.createSupportRequest)
.get('/:userId', supportController.getSupport)
.get('/institiute/:InstituteId', supportController.getSupportByInstituteId)
.get('/', supportController.getAllSupports)
.put('/respond/:userId', supportController.respondToSupportRequest);


module.exports = router;