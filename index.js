import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ClientRoute from "./routes/ClientRoute.js";
import CompanyRoute from "./routes/CompanyRoute.js";
import BusinessUnitRoute from "./routes/BusinessUnitRoute.js";
import TrafficLightRoute from "./routes/TrafficLightRoute.js";
import EventRoute from "./routes/EventRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async () => {
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// Ajuste de CORS
app.use(cors({
    credentials: true,
    origin: 'https://grupomrlaguna.com/' 
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(ClientRoute);
app.use(AuthRoute);
app.use(CompanyRoute);
app.use(BusinessUnitRoute);
app.use(TrafficLightRoute);
app.use(EventRoute);

store.sync();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT || 5000}...`);
});
