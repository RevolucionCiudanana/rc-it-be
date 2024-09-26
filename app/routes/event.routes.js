const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/event/createEvent",
        controller.createEvent
    );
    app.delete(
        "/api/event/deleteEventByUUID/:uuid",
        [authJwt.verifyToken],
        controller.deleteEventByUUID
    )
    app.post(
        "/api/event/getEventsByEmail",
        [authJwt.verifyToken],
        controller.getEventsByEmail
    );

    app.get(
        "/api/event/getEventByUUID/:uuid",
        controller.getEventByUUID
    );

    app.get(
        "/api/event/getEvents",
        controller.getEvents
    );
};
