const { Router } = require('express');
const projectWorkProgController = require('./../controllers/projectWorkProgeressController')
// const { requireAuth } = require('./../middlewares/requireAuth')
const router = Router();

// router.use(requireAuth);
router
.post('/:reportId',   projectWorkProgController.creatProjectProgress)
.get('/:reportId',   projectWorkProgController.getProjectProgress)
.delete('/:id', projectWorkProgController.deleteWorkProgress)
.delete('/:id/item/:itemId', projectWorkProgController.deleteProjectWorkRow)
.patch('/item/:itemId', projectWorkProgController.updateProjectWork);





module.exports = router;