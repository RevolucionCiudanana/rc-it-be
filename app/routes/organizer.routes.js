const { authJwt } = require("../middleware");
const controller = require("../controllers/organizer.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/organizer/createOrganizer",
        [authJwt.verifyToken],
        controller.createOrganizer
    );

    app.delete(
        "/api/organizer/deleteOrganizerByUUID/:uuid",
        [authJwt.verifyToken],
        controller.deleteOrganizerByUUID
    );

    app.get(
        "/api/organizer/getOrganizerByUUID/:uuid",
        [authJwt.verifyToken],
        controller.getOrganizerByUUID
    );

    app.get(
        "/api/organizer/getOrganizersByUserUUID/:userUUID",
        [authJwt.verifyToken],
        controller.getOrganizersByUserUUID
    );

    app.get(
        "/api/organizer/getOrganizers",
        [authJwt.verifyToken],
        controller.getOrganizers
    );
};
