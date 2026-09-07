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

const createUser = async(req,res) => {
    try{
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.createUser({email, password_hash,full_name, phone, avatar_url, role, is_active});
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
    }catch(err){
        console.error('createUser error (controller)',err);
        res.status(500).json({
            success: false,
            message : 'Server error'
        })
    }
}

const updateUser = async(req,res) => {
    try{
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.updateUser(req.params.id, {email, password_hash,full_name, phone, avatar_url, role, is_active});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success: true,
            message: `updated ${user.full_name} successfully`,
            data: user
        })
    }catch(err){
        console.error('updateUser error (controller)',err);
        res.status(500).json({
            success: false,
            message : 'Server error'
        })
    }
}

const deleteUser = async(req,res) => {
    try{
        const user = await UserModel.deleteUser(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200).json({
            success: true,
            message: `deleted ${user.full_name} successfully`,
            data: user
        })
    }catch(err){
        console.error('deleteUser error (controller)',err);
        res.status(500).json({
            success: false,
            message : 'Server error'
        })
    }
}


module.exports = { getUsers,createUser, updateUser, deleteUser }
