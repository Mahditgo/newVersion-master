const {Router} = require('express');
const carDescription = require('./../controllers/getCarDescription')
// const { requireAuth } = require('./../middlewares/requireAuth')
// router.use(requireAuth);
const router = Router();

router.get('/:reportId/:timeVar', carDescription.getCarDescription);

module.exports = router;