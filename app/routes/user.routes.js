const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);

  app.post("/api/user/create-customer", [authJwt.verifyToken], controller.createCustomer);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isCustomer],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
