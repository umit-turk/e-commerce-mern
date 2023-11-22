const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isValidEmail = (email) => {
    // E-posta doğrulama Regex'i
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, "SECRETTOKEN", { expiresIn: "1h" });
};

module.exports = {
    hashPassword,
    comparePasswords,
    generateToken,
    isValidEmail,
};