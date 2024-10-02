import express from "express";
import { configs } from "./configs";
import { urlRouter } from "./routes";
import {dbConnect} from "./utils";
import { errorHandler } from "./middlewares";

const app = express();

app.use(express.json());

app.use('/', urlRouter);

app.listen(configs.server.port, async() => {
    console.log(`Server is running on PORT: ${configs.server.port}`);
    await dbConnect();
});

app.use(errorHandler);