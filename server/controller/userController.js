import UserModel from '../models/users.js';
import AppError from "../utils/Errors/AppError.js";
import catchAsync from "../utils/Errors/catchAsync.js";

export const getUsers = catchAsync (async(req, res) => {
        const { page, limit } = req.query;
        const result = await UserModel.findAllUsers({ page, limit });
        res.json({
            success: true,
            message: 'Get all users successfully',
            ...result,
        })
});

export const createUser = catchAsync(async(req,res) => {
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.createUser({email, password_hash,full_name, phone, avatar_url, role, is_active});
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        })
});

export const updateUser =catchAsync (async(req,res) => {
        const {email, password_hash,full_name, phone, avatar_url, role, is_active} = req.body;
        const user = await UserModel.updateUser(req.params.id, {email, password_hash,full_name, phone, avatar_url, role, is_active});
        if(!user){
            return next(new AppError("Không tìm thấy người dùng",404))
        }
        res.status(200).json({
            success: true,
            message: `updated ${user.full_name} successfully`,
            data: user
        })
});

export const deleteUser = catchAsync(async(req,res) => {
        const user = await UserModel.deleteUser(req.params.id);
        if(!user){
            return next(new AppError("Không tìm thấy người dùng",404))
        }
        res.status(200).json({
            success: true,
            message: `deleted ${user.full_name} successfully`,
            data: user
        })
});


export default { getUsers,createUser, updateUser, deleteUser }
