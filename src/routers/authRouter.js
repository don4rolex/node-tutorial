import debug from "debug";
import express from "express";
import {MongoClient, ObjectId} from "mongodb";

const d = debug("app:adminRouter");
const authRouter = express.Router();

authRouter.route("/signUp")
    .post((request, response) => {
        response.json(request.body)
    });


export default authRouter;