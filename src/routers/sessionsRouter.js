import express from "express";
import sessions from "../data/sessions.json" assert {type: "json"};

const sessionsRouter = express.Router();

sessionsRouter.route("/")
  .get((request, response) => {
    response.render("sessions", {sessions});
  });

sessionsRouter.route("/:id")
  .get((request, response) => {
    const id = request.params.id
    response.render("session", {
      session: sessions[id]
    });
  });

export default sessionsRouter;