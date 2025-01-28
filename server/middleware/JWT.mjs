import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(403).send({ message: 'no token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'invalid token' });
    }
};

export default verifyToken;