import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Get the cookie string from the request headers
  const cookieString = req.headers.cookie;
  console.log(req.headers);

  if (!cookieString) {
    return res.status(401).json({ message: 'No cookies found' });
  }

  // Parse the cookie string into an object
  const cookieArray = cookieString.split('; ');
  const cookieObject = {};

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookieObject[key] = value;
  });

  // Extract the access token from the cookies
  const token = cookieObject.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

export { verifyToken };
