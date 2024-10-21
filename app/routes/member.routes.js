const { authJwt } = require("../middleware");
const controller = require("../controllers/member.controller");

module.exports = function (app) {
    // Middleware to set headers
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Route to create a new member
    app.post(
        "/api/member/createMember",
        controller.createMember
    );

    // Route to delete a member by ID (requires token verification)
    app.delete(
        "/api/member/deleteMemberById/:id",
        [authJwt.verifyToken],
        controller.deleteMemberById
    );

    // Route to get member details by ID
    app.get(
        "/api/member/getMemberById/id",
        controller.getMemberById
    );

    // Route to get all members
    app.get(
        "/api/member/getAllMembers",
        controller.getAllMembers
    );
};
