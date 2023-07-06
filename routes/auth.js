const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'name must be minimum of 3 characters').isLength({ min: 3 }),
    body('password', 'password must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Checks whether the user with this email exists already
    let findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    // Hashing the password along with salt
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    success = true;

    // Getting role from email ID
    const Role = req.body.email.slice(req.body.email.indexOf("@") + 1, req.body.email.indexOf("."));

    if (Role == "student" || Role == "admin" || Role == "superadmin") {
        // Creating a User and Adding its Data in the Database
        await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
            role: Role
        }).then(user => res.json({ success, user }))
            .catch((err) => {
                res.status(400).json({ Error: err.message })
            });
    }

    else {
        return res.status(400).json({ success, error: "Please Use only Company's email ID" });
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    var success = false;
    // This will throw an error if the name, email or password are not valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid Credentials' })
        }

        // Comparing the password entered by the User with the Hashed password of the Database
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            success = false;
            return res.status(400).json({ success, error: 'Invalid Credentials' })
        }

        // Generating a Json Web Token of the required User ID
        const data = {
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        }
        const authtoken = jwt.sign(data, 'shhhhh');
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        // Finding user from the database and sending all its informations except password
        const user = await User.findById(userID).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.post('/getrole', fetchuser, async (req, res) => {
    try {
        res.send(req.user.role);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.post('/fetchall', fetchuser, async (req, res) => {
    if (req.user.role == "student") return res.status(404).json({ error: 'Students are not allowed' })
    let allusers;
    try {
        if (req.user.role == "admin") {
            allusers = await User.find({ role: "student" }).select('-password');
        }

        else if (req.user.role == "superadmin") {
            allusers = await User.find({ role: { $in: ["admin", "student"] } }).select('-password');
        }
        res.send(allusers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

router.delete('/deleteuser/:id', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('Not Found')
        }
        // Checks if the note User is same as the User of the token
        if (req.user.role == "superadmin") {
            user = await User.findByIdAndDelete(req.params.id);
            res.json({
                Success: "User has been deleted",
                user: user
            })
        }

        else if (req.user.role == "admin") {
            user = await User.findById(req.params.id);

            if (user.role != "superadmin" && user.role != "admin") {
                user = await User.findByIdAndDelete(req.params.id);
                res.json({
                    Success: "User has been deleted",
                    user: user
                })
            }
            else{
                return res.status(401).send('Admins are Not Allowed to do this')
            }
        }

        else {
            return res.status(401).send('Students are Not Allowed to do this')
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router