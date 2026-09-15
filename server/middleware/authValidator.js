import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email là bắt buộc')
    .isEmail().withMessage('Email không đúng định dạng')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password là bắt buộc')
    .isLength({ min: 8 }).withMessage('Password phải có ít nhất 8 ký tự')
    .matches(/\d/).withMessage('Password phải chứa ít nhất 1 chữ số')
    .matches(/[A-Za-z]/).withMessage('Password phải chứa ít nhất 1 chữ cái'),

  body('name')
    .trim()
    .notEmpty().withMessage('Tên là bắt buộc')
    .isLength({ min: 2, max: 100 }).withMessage('Tên phải từ 2-100 ký tự'),
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email là bắt buộc')
    .isEmail().withMessage('Email không đúng định dạng')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password là bắt buộc'),
];

// Middleware kiểm tra kết quả validate, dùng chung cho mọi route
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Dữ liệu không hợp lệ',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

export default { registerValidation, loginValidation, handleValidationErrors };