import express from "express";
import debug from "debug";
import {MongoClient} from "mongodb";
import sessions from "../data/sessions.json" assert {type: "json"};

const adminRouter = express.Router();
const d = debug("app:adminRouter");

adminRouter.route("/")
  .get((request, response) => {
    const url = "mongodb+srv://don4rolex:MAaJA4EArq0rgmTy@globomantics.xwzzous.mongodb.net/?retryWrites=true&w=majority";
    const dbName = "globomantics";

    (async function mongo() {
      let mongoClient;
      try {
        mongoClient = await MongoClient.connect(url);
        d("Connected to mongo DB");

        const db = mongoClient.db(dbName);

        const queryResponse = await db.collection("sessions")
          .insertMany(sessions);

        response.json(queryResponse);
      } catch (error) {
        d(error.stack);
      }
      await mongoClient.close();
    }());
  });


export default adminRouter;