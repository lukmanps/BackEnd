"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const cors_1 = __importDefault(require("cors"));
//Creating App and Server
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`:::::::::: Server Running on PORT ${PORT} ::::::::::`);
});
app.use('/', (0, user_1.default)());
app.use('/admin', (0, admin_1.default)());
//Database Connection
(0, dbConnection_1.default)();
