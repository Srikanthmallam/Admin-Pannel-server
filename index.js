const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')


const app = express();

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(
  cors({ credentials: true, origin: "https://admin-pannel-inky.vercel.app" })
);

app.use('/admin',adminRoutes);
app.use('/employee',employeeRoutes);

app.use(notFound);
app.use(errorHandler);



connect(process.env.MONGO_URI)
  .then(
    app.listen(5000, () =>
      console.log(`server connected on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

