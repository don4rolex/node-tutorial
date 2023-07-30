import debug from "debug";
import express from "express";
import {MongoClient, ObjectId} from "mongodb";

const d = debug("app:adminRouter");
const sessionsRouter = express.Router();

const dbName = "globomantics";
const url = "mongodb+srv://don4rolex:MAaJA4EArq0rgmTy@globomantics.xwzzous.mongodb.net/?retryWrites=true&w=majority";

sessionsRouter.route("/")
  .get((request, response) => {
    (async function mongo() {
      let mongoClient;
      try {
        mongoClient = await MongoClient.connect(url);
        d("Connected to mongo DB");

        const db = mongoClient.db(dbName);

        const sessions = await db.collection("sessions")
          .find()
          .toArray();

        response.render("sessions", {sessions});
      } catch (error) {
        d(error.stack);
      }
      await mongoClient.close();
    }());
  });

sessionsRouter.route("/:id")
  .get((request, response) => {
    const id = request.params.id;

    (async function mongo() {
      let mongoClient;
      try {
        mongoClient = await MongoClient.connect(url);
        d("Connected to mongo DB");

        const db = mongoClient.db(dbName);

        const session = await db.collection("sessions")
          .findOne({
            _id: new ObjectId(id)
          });

        response.render("session", {session});
      } catch (error) {
        d(error.stack);
      }
      await mongoClient.close();
    }());
  });

export default sessionsRouter;