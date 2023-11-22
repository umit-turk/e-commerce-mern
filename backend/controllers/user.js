const User = require("../models/user.js");
const {isValidEmail, hashPassword, generateToken, comparePasswords} = require("../utils/user.js");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const avatar = await cloudinary.uploader.upload(req.body.avatar, {
            folder:"avatars",
            width:130,
            crop:"scale",
        });

        // E-posta geçerli mi kontrol et
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-posta adresi" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Böyle bir kullanıcı zaten var!"
            });
        }

        const passwordHash = await hashPassword(password);

        if (password.length < 6) {
            return res.status(400).json({ message: "Şifre 6 karakterden küçük olamaz" });
        }

        const newUser = await User.create({ name, email, password: passwordHash, avatar:{public_id:avatar.public_id, url:avatar.secure_url} });

        const token = generateToken(newUser._id);

        const cookieOptions = {
            httpOnly:true,
            expires:new Date(Date.now() + 5 * 24*60*60*1000)
        }
        
        res.status(201).cookie("token", token, cookieOptions).json({
            message: "Kullanıcı başarıyla oluşturuldu",
            user: newUser,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Kullanıcı oluşturma sırasında bir hata oluştu",
            error: error.message
        });
    }
};


const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-posta adresi" });
        }

        if(!user){
            return res.status(500).json({message:"Böyle bir kullanıcı bulunamadı!"})
        }

        const comparePassword = await comparePasswords(password, user.password);

        if(!comparePassword){
            return res.status(500).json({message:"Yanlış şifre girdiniz"})
        }

        const token = generateToken(user._id);

        const cookieOptions = {
            httpOnly:true,
            expires:new Date(Date.now() + 5 * 24*60*60*1000)
        }
        
        res.status(201).cookie("token", token, cookieOptions).json({
            message: "Giriş başarıyla yapıldı",
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Giriş işlemlerinde bir hata oluştu!",
            error: error.message
        });
    }
}

const logout = async (req,res) => {
    try {
        const cookieOptions = {
            httpOnly:true,
            expires:new Date(Date.now())
        }
        res.status(200).cookie("token",null,cookieOptions).json({
            message:"Çıkış işlemi başarılı"
        })
    } catch (error) {
        res.status(500).json({
            message: "Çıkış işleminde bir hata oluştu!",
            error: error.message
        });
    }
}

const forgotPassword = async (req,res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    try {
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-posta adresi" });
        }

        if(!user){
        return res.status(404).json({ message: "Böyle bir kullanıcı bulunamadı" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpired =  Date.now() + 5 * 60 * 1000;

        await user.save({validateBeforeSave:false})

        const passwordUrl = `${req.protocol}://${req.get("host")}/reset/${resetToken}`

        const message = `Şifreni sıfırlamak için kullanacağın token : ${passwordUrl}`

        const transporter = nodemailer.createTransport({
            port: 465,
            service:"gmail",               // true for 465, false for other ports
            host: "smtp.gmail.com",
               auth: {
                //kullanıcıya göndereceğin mail ve parolası kendii mailimiz
                    user: 'youremail@gmail.com',
                    pass: 'password',
                 },
            secure: true,
            });
            const mailData = {
                //kendi mail adresim
                from: 'youremail@gmail.com',  // sender address
                  to: email, 
                  subject: 'Şifre sıfırlama',
                  text: message
                };
            await transporter.sendMail(mailData);
            res.status(200).json({message:"Mailinizi kontrol ediniz"})

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpired = undefined
        res.status(500).json({message:error.message})
    }
}

const resetPassword = async (req,res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired:{$gt: Date.now()}
    })
    try {
        if(!user){
            return res.status(500).json({message:"Geçersiz token"})
        }

        user.password = req.body.password;
        user.resetPasswordExpired = undefined;
        user.resetPasswordToken = undefined;

        await user.save();

        const token = generateToken(user._id);
        const cookieOptions = {
            httpOnly:true,
            expires:new Date(Date.now() + 5 * 24*60*60*1000)
        }
        
        res.status(201).cookie("token", token, cookieOptions).json({
            message: "Şifre başarıyla sıfırlandı",
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const userDetail = async (req, res, next) => {
    const user = await User.findById(req.params.id)
    try {
        res.status(200).json({
        user,
        });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {register, login, forgotPassword, resetPassword, logout, userDetail}