const UserModel = require('../models/users');

const getUsers = async(req, res) => {
    try{
        const { page, limit } = req.query;
        const result = await UserModel.findAllUsers({ page, limit });
        res.json({
            success: true,
            message: 'Get all users successfully',
            ...result,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

module.exports = { getUsers }
