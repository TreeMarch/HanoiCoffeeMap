// phan quyen theo role admin - user - owner

function authorize(...allowedRoles){
    return (req,res,next) => {
        if(!req){
            return res.status(401).json({
                message: "Chưa xác nhận"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "Bạn không đủ quyền thực hiện hành động này"
            })
        }
        next();
    }
}

export default authorize;