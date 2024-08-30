const getDB = require('../db');
const { UserDetail } = require('otpless-node-js-auth-sdk');

require('dotenv').config();

// const phoneNumber = "919481776681";
// const channel = "WHATSAPP";
// const email = "kavanamanchale@gmail.com";
// const redirectURI = "mentara.xyz"

const magicLinkGeneration = async (req, res) => {
    try {
  
      const magicLinkTokens = await UserDetail.magicLink(phoneNumber,email,redirectURI,channel,process.env.CLIENT_ID,process.env.CLIENT_SECRET);
      console.log("MagicLink Tokens Details:", magicLinkTokens);
      res.json(magicLinkTokens);
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred in magic-link-token' });
    }
};

const verifyToken= async (req, res) => {
    try {

        const userDetailUsingToken = await UserDetail.verifyToken(token,process.env.CLIENT_ID,process.env.CLIENT_SECRET);
        console.log("User Details:", userDetailUsingToken);
        res.json(userDetailUsingToken);

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred in verify-token' });
    }
};

module.exports ={
  verifyToken,
  magicLinkGeneration
}