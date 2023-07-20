import express from 'express';
import connectDB from './config/dbConnection';
import logger from 'morgan';
import userRouter from './routes/user';
import adminRouter from './routes/admin';
import cors from 'cors'



//Creating App and Server
const app = express();

app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))



app.use(cors());

const PORT: number = 8000
app.listen(PORT, ()=>{
    console.log(`:::::::::: Server Running on PORT ${PORT} ::::::::::`)
})

app.use('/', userRouter());
app.use('/admin', adminRouter());


//Database Connection
connectDB();
