// wrapper để không phải viết try/catch lặp lại ở mỗi controller - boc async function, tu dong catch error và forward vao next()
function catchAsync(fn){
    return (req,res,next)=> {
        fn(req,res,next).catch(next);
    };
}

export default catchAsync;