const {Router} = require('express');
const contradiction = require('./../controllers/contradictionController')
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router.get('/:reportId', contradiction.contradiction);

module.exports = router;