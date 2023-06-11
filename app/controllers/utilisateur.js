const UserModel = require('../Model/utilisateur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

exports.register = async (req, res) => {
    try {
        const {first_name,last_name,email,password} = req.body
        if (!email && !first_name && !last_name && password){
            res.status(400).send({
                status: res.status,
                message: "All inputs are required"
            })
        }
        const oldUser = await UserModel.findOne({email})
        if (oldUser){
            return res.status(409).send("user already exist , please log in")
        }
        encryptedPassword = await bcrypt.hash(password, 10)
        const user =await UserModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password : encryptedPassword
        })
        user.token = jwt.sign(
            {user: user._id, email},
            JWT_SECRET,
            {expiresIn: "2h"},
        )
        res.status(201).json({
            status: 201,
            success: true,
            data: {
                id: user._id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                token: user.token
            }
        })
    }catch (err){
        console.log(err)
    }
}

exports.logIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        if (!(email && password)){
            res.status(400).send('all input are required');
        }
        const user = await UserModel.findOne({email});
        if (user &&(await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id : user._id, email},
                JWT_SECRET,
                {expiresIn: "2h"},

            );
            user.token = token;
            res.status(200).json({
                status: 201,
                success: true,
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: email,
                    token: user.token,
                    id: user._id

                }
            })
        }
    }catch (err){
        console.log(err)
    }
}
