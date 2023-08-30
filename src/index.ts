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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ['https://scrap-stock.web.app', 'http://localhost:3001']);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});




const PORT: number = 3000
app.listen(PORT, () => {
    console.log(`:::::::::: Server Running on PORT ${PORT} ::::::::::`)
})

app.use('/', userRouter());
app.use('/admin', adminRouter());


//Database Connection
connectDB();
