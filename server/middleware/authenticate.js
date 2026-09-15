import jwt from "../utils/jwt.js"
// verify token

export const authenticate = async(req,res,next) => {
    const authHeader = req.header.authorization;
    const token = authHeader && authHeader.split('')[1]; // Bearer <token>

    if(!token){
        return res.status(401).json({
            message: "Thiếu token, vui lòng đăng nhập"
        })
    }
    try{
        const decoded = jwt.verifyToken(token); 
        req.user = decoded; // {userId, role. iat, exp}
        next();
    }catch(error){
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn"
        })
    }
}


export default authenticate;
