const { Router } = require("express");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage: storage });

const {createEmployee,getEmployees,getEmployee,editEmployee,deleteEmployee} = require('../controllers/employeeController');

const authorization = require('../middleware/auth.js')

const router = Router();

router.post('/create',authorization,upload.single("image"),createEmployee);
router.get("/",authorization,getEmployees);
router.get("/:id",authorization,getEmployee);
router.post("/edit/:id",authorization,upload.single('image'),editEmployee);
router.delete('/delete/:id',authorization,deleteEmployee);
module.exports = router;
