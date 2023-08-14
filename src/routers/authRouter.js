import debug from "debug";
import express from "express";
import {MongoClient} from "mongodb";

const d = debug("app:adminRouter");
const authRouter = express.Router();
const url = "mongodb+srv://don4rolex:MAaJA4EArq0rgmTy@globomantics.xwzzous.mongodb.net/?retryWrites=true&w=majority";
const dbName = "globomantics";

authRouter.route("/signUp")
    .post((request, response) => {
        const {username, password} = request.body;
        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const user = {username, password};
                const results = await db.collection("users")
                    .insertOne(user);
                d(results);
                request.login(results.ops[0], () => {
                    response.redirect("/auth/profile");
                });
            } catch (error) {
                d(error);
            }
            await client.close();
        }());
    });

authRouter.route("/profile")
    .get((request, response) => {
        response.json(request.user);
    });


export default authRouter;