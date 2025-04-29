const jwt = require("jsonwebtoken");

export const issueJWT = (user) => {
  const id = user._id;

  const expiresIn = "1d";

  const payload = {
    username: user.username,
    id: id,
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer" + signedToken,
    expires: expiresIn,
  };
};
