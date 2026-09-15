import {body, validationResult} from 'express-validator';

export const validateCreateCafe = [
    body('name').trim().notEmpty().withMessage("Tên quán không được để trống"),
    body('address').trim().notEmpty().withMessage("Địa chỉ quán không được để trống"),
    body('price_min').optional().isFloat({min : 0}).withMessage("Giá tối thiểu không được là số âm"),
    body('price_max').optional().isFloat({min : 0}).withMessage("Giá tối đa không được là số âm"),
    body('district').trim().notEmpty().withMessage("Quận/Huyện không được được để trống"),
    body('latitude').trim().notEmpty().isFloat({min: -90, max: 90}).withMessage("Vĩ độ không được để trống"),
    body('longitude').trim().notEmpty().isFloat({min: -180, max: 180}).withMessage("Kinh độ không được để trống"),

    (req,res, next) => {
        const error = validationResult(req);
    
        if(!error.isEmpty()){
            return res.status(400).json({
                success: false,
                message: error.array()[0].msg,
                errors: error.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            })
        }
        next();
    }
]

export const validateUpdateCafe = [
    body('name').optional().trim().notEmpty().withMessage("Tên quán không được để trống"),
    body('address').optional().trim().notEmpty().withMessage("Địa chỉ quán không được để trống"),
    body('price_min').optional().isFloat({min : 0}).withMessage("Giá tối thiểu không được là số âm"),
    body('price_max').optional().isFloat({min : 0}).withMessage("Giá tối đa không được là số âm"),
    body('district').optional().trim().notEmpty().withMessage("Quận/Huyện không được được để trống"),
    body('latitude').optional().trim().notEmpty().isFloat({min: -90, max: 90}).withMessage("Vĩ độ không được để trống"),
    body('longitude').optional().trim().notEmpty().isFloat({min: -180, max: 180}).withMessage("Kinh độ không được để trống"),

    (req,res, next) => {
        const error = validationResult(req);
    
        if(!error.isEmpty()){
            return res.status(400).json({
                success: false,
                message: error.array()[0].msg,
                errors: error.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            })
        }
        next();
    }
]
export default { validateCreateCafe,validateUpdateCafe }