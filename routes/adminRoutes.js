const {Router} = require('express');

const {register,login,getAdmin} = require('../controllers/adminConteller')

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/getAdmin/:id',getAdmin);


module.exports = router