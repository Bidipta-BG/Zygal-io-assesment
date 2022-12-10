const express = require('express');
const router = express.Router();
const userModel = require('./models/userModel')


router.post("/createUser", async function (req, res) {
    try {
        let data = req.body
        let username = data.username.toLowerCase()
        let password = data.password
        let findUser = await userModel.findOne({ username: username })
        if (findUser) return res.status(400).send({ status: false, message: "This username already exists. Please enter another name" })
        let createData = await userModel.create({ username: username, password: password })
        return res.status(201).send({ status: true, message: 'User Created Success', data: createData })
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, message: 'Server Side Error. Please try later', info: error})
    }
    
})



router.post("/login", async function(req, res){
    try {
        let body = req.body
        let name = body.username.toLowerCase()
        let password = body.password
        let findUser = await userModel.findOne({ username: name })
        if (!findUser) return res.status(400).send({ status: false, message: "User doesnot exist. Please create user first" })
        let matchPassword = await userModel.findOne({ username: name, password: password })
        if (!matchPassword) return res.status(400).send({ status: false, message: "Incorrect Password" })
        return res.status(200).send({ status: true, message: 'User found Successfull', data: findUser })
    } 
    
    catch (error) {
        return res.status(500).send({ status: false, message: 'Server Side Error. Please try later', info: error })
    }
    
})


module.exports = router;