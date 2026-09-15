import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5,                   
  message: { message: 'Quá nhiều lần đăng nhập thất bại, vui lòng thử lại sau 15 phút' },
  standardHeaders: true,      // trả về thông tin rate limit qua header RateLimit-*
  legacyHeaders: false,
  skipSuccessfulRequests: true, // chỉ tính các lần thất bại, login thành công không bị tính vào giới hạn
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 10,                   // tối đa 10 lần đăng ký / IP / giờ
  message: { message: 'Quá nhiều yêu cầu đăng ký, vui lòng thử lại sau' },
  standardHeaders: true,
  legacyHeaders: false,
});

export default { loginLimiter, registerLimiter };