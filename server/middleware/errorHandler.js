// middleware xử lý lỗi tập trung


function errorHandler(err,req,res,next){
    const statusCode = err.statusCode || 500;
    const isProduction = process.env.NODE_ENV === 'production';

    //log loi o server (luon log, ke ca production de debug)
    console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);

    //loi 'biet truoc' (validate , not found, unauthorized,...) - tra message ro rang 
    if(err.isOperational){
        return res.status(statusCode).json({success: false,message: err.message});
    }

    // loi khong luong truoc (db crash, bug,...) - khong lo chi tiet ra production
    res.status(500).json({
    success: false,
    message: isProduction ? 'Đã xảy ra lỗi, vui lòng thử lại sau' : err.message,
    ...(isProduction ? {} : { stack: err.stack })
  });
}

export default errorHandler;