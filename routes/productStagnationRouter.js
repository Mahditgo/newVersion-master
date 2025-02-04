const {Router} = require('express');
const productStagnationController = require('./../controllers/productStagnationController')
const router = Router();

router.get('/:reportId', productStagnationController.getStagnationProduct);

module.exports = router;