import { JWT } from "../utils/auth";

async function authentication(req, res, next) {
  let token;
  try {
    token = req.headers['authorization'].split(' ')[1];
  } catch (e) {
    token = '';
  }

  const result = await JWT.verify(token);
  if (!result) {
    res.status(400);
    return;
  }
  next();
};

export default authentication;