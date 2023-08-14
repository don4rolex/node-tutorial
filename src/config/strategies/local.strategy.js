import passport from "passport";
import {Strategy} from "passport-local";

export default function localStrategy() {
    const strategy = new Strategy(
        {
            usernameField: "username",
            passwordField: "password"
        },
        (username, password, done) => {
            const user = {username, password, name: "Andrew"};
            done(null, user);
        }
    );
    passport.use("local-strategy", strategy);
}