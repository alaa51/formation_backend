const express =require('express');
const UserController = require('../controllers/User')
const router = express.Router();
const authVerification = require('../middleware/auth')

router.get('/',[authVerification], UserController.findAll);
router.get('/:id',[authVerification],UserController.findOne);
router.post('/create',[authVerification], UserController.create);
router.patch('/update/:id',[authVerification], UserController.update);
router.delete('/delete/:id',[authVerification], UserController.destroy);


module.exports = router;
