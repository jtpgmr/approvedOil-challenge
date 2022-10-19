import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import apiRoutes from "./api/routes.js";
import * as middlewares from "./middlewares/index.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", apiRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app