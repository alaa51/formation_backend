const express =require('express');
const ProductController = require('../controllers/products')
const router = express.Router();
const authVerification = require('../middleware/auth')

router.get('/',[authVerification], ProductController.findAll);
router.get('/:id',[authVerification],ProductController.findOne);
router.post('/create',[authVerification], ProductController.create);
router.patch('/update/:id',[authVerification], ProductController.update);
router.delete('/delete/:id',[authVerification], ProductController.destroy);


module.exports = router;
