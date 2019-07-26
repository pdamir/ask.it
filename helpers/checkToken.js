const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  validateToken: (allowedForBoth = false) => {
    return (req, res, next) => {
      const authorizationHeaader = req.headers.authorization;
      let result;
      if (authorizationHeaader) {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        const options = {
          expiresIn: "1d"
        };
        try {
          // verify makes sure that the token hasn't expired and has been issued by the app
          result = jwt.verify(token, process.env.SERVER_KEY, options);

          // Let's pass back the decoded token to the request object
          req.decoded = result;
          req.user = result;
          // Call next to pass execution to the subsequent middleware
          next();
        } catch (err) {
          // Throw an error just in case anything goes wrong with verification
          throw new Error(err);
        }
      } else {
        if (allowedForBoth) {
          // If a route is allowed for both authenticated and non-authenticated users, call next() if there is no Authorization header
          next();
        } else {
          result = {
            message: "unauthorized",
            status: 401
          };
          res.status(401).send(result);
        }
      }
    };
  }
};
