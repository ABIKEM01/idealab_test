import JWT from "jsonwebtoken";
import User from "../models/user.model.js";


const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('the token', token)
        try {
            const decoded = await JWT.verify(token, process.env.JWTSECRET)
            console.log('decoded', decoded.id)
            const user = await User.findByPk(decoded.id)
            console.log(user)
            req.user = user;
            next()
        } catch (err) {
            console.log(err.message)
            res.status(401).json({
                status: 'failed',
                error: err.message
            })
        }

    }

    if (!token) {
        res.status(401).json({
            status: 'failed',
            error: 'No token, Not authorized!'
        })
    }
}

//user role authorization

const authorizeUser = (roles) => {
    return (req, res, next) => {
        console.log("the req user", req.user)
        if (!roles.includes(req.user.role)) {
            throw new Error(`Role (${req.user.role}) is not allowed to access this resource.`)
        }
        next();
    }
}

export { protect, authorizeUser }