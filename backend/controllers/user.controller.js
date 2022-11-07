import { Sequelize, DataTypes } from "sequelize";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const sequelize = new Sequelize(
    'idealab_assignment',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// registeration route
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        const userExists = await User.findOne({ where: { email } }).catch(err => {
            if (err) console.log("Error : ", err)
        })

        if (userExists) {

            return res.status(400).json({
                status: 'failed',
                error: "User with this email already exists"
            })

        }

        // sequelize.sync().then(() => {

        const user = User.create({
            name: name,
            email: email,
            password: password,
            role: role
        })

        console.log("the created user", user)

        res.status(200).json({
            status: 'success',
            user: user
        })

        // })
    } catch (err) {
        console.error('Unable to create table : ', err);
    }

}


// get all users

const getAllUsers = async (req, res) => {
    try {
        // sequelize.sync().then(() => {
        let getUser = await User.findAll()
        res.status(200).json({
            status: 'Success',
            getUser
        })
        // })
    } catch (err) {
        res.status(400).json({
            status: 'Get all users Failed',
            error: err
        })
    }

}


const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ where: { email } }).catch(err => {
            if (err) console.log(err)
        })

        console.log("the user", user)
        if (user.password !== password) {
            return res.status(400).json({
                status: 'bad',
                error: "Email and Password does not match"
            })

        }

        const jwttoken = jwt.sign({
            id: user.id, email: user.email
        }, process.env.JWTSECRET, { expiresIn: '2hrs' })

        if (user.password === password) {
            res.status(201).json({
                status: 'success',
                user: {
                    email: email,
                    jwttoken
                }
            })
        } else {
            res.status(402)
            throw new Error('incorrect Email or password')
        }

    } catch (error) {
        res.status(400).json({
            status: 'Login Failed',
            error: "Please provide valid email and password"
        })
    }
}


export {
    registerUser,
    getAllUsers,
    loginUser
}