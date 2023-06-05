const express =require('express');
const UserController = require('../controllers/User')
const router = express.Router();
const authVerification = require('../middleware/auth')

router.get('/',[authVerification], UserController.findAll);
router.get('/:id',UserController.findOne);
router.post('/create', UserController.create);
router.patch('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.destroy);


module.exports = router;
