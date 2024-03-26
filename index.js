const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const{dbConnection}=require('./database/database');
const foodRouter = require('./routes/foodrouter');
const userRouter = require('./routes/userrouter');
const orderRouter = require('./routes/orderrouter');
const uploadRouter = require('./routes/uploadrouter');
// const mentorRoute = require('./routes/mentor')
// const assignMentortoStudent = require('./routes/assignmentortostudent')

const PORT = process.env.PORT||8000;
dotenv.config();
const app = express();
app.use(cors({ // Use cors as a function
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
      }));
app.use(express.json());
dbConnection();
app.get('/',(req,res)=>{
    try {
       res.status(200).send({
        message:"working"
       }) 

    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
})
app.use('/api/users',userRouter)
app.use('/api/foods',foodRouter)
app.use('/api/orders',orderRouter)
app.use('/api/uploads',uploadRouter)
// app.use('/mentor',mentorRoute)
// app.use('/assignmentor',assignMentortoStudent)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });