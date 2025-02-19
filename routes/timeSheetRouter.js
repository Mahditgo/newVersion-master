const { Router } = require('express');
const timeSheetController = require('./../controllers/timeSheetController');
// const { requireAuth } = require('./../middlewares/requireAuth')

const router = Router();

// router.use(requireAuth);
router
.post('/:reportId',  timeSheetController.createTimeSheet)
.post('/workHoures',  timeSheetController.createworkHoures)
.patch('/:itemId' , timeSheetController.updateTimeSheet)
.patch('/:itemId/items/:workHourId' , timeSheetController.updateWorkHours)
.delete('/item/:itemId', timeSheetController.deleteItem)
.delete('/:itemId/item/:workHourId', timeSheetController.deleteWorkHour)
.get('/:reportId' , timeSheetController.getTimeSheet)


module.exports = router