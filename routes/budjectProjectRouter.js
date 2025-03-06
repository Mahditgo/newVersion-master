const {Router} =  require('express');
const budjectController = require('./../controllers/budjectProjectController');

const router = Router();
router
.post('/:reportId', budjectController.createBudjectProject)
.get('/:reportId', budjectController.getBudjetProject)
.patch('/items/:itemId', budjectController.updateBudjet)


module.exports = router;