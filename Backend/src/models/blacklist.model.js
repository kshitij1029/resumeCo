const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true,"Token is to be reuired to be blacklist"],
    },
}, 
{
    timestamps: true         //Token kabh blacklist hua tha 
});

const tokenBlacklistModel = mongoose.model('blacklistTokens', blacklistTokenSchema);

module.exports = tokenBlacklistModel;

