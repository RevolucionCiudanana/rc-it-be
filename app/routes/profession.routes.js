const controller = require("../controllers/profession.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/profession/allProfessionsBySector", controller.allProfessionsBySector);
    app.get("/api/profession/allProfessions", controller.allProfessions);

};
