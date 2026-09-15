import cafeModel from '../models/cafes.js';
import cafeService from '../services/cafes.js'
import AppError from "../utils/Errors/AppError.js";
import catchAsync from "../utils/Errors/catchAsync.js";



//GET
// ===============================================
export const getCafes = catchAsync(async (req, res) => {
        const { page, limit } = req.query;
        const result = await cafeModel.findAllCafes({ page, limit });
        res.json({
            success: true,
            message: 'Lấy danh sách quán các quán cafe thành công',
            ...result,
        })    
});


export const getCafeById = catchAsync(async (req, res) => {
        const result = await cafeModel.findCafeById(req.params.id);
        if(!result){
            return next(new AppError("Không tìm thấy quán cafe",404))
        }
        res.json({
            success: true,
            message: 'Cafe spot found successfully',
            data: result
        })
});

// ===============================================
//POST
export const createCafe = catchAsync(async (req,res) => {
         const { owner_id, name, slug, description, address, district, latitude, longitude, phone, website, open_time, close_time, price_min, price_max, wifi, has_parking } = req.body 

         const cafe = await cafeService.createSluCafe({
             owner_id, name, slug, description, address, district, latitude, longitude, phone, website, open_time, close_time, price_min, price_max, wifi, has_parking 
         })

         return res.status(201).json({
            success: true,
            message: `Thêm quán cafe thành công`,
            data: cafe
         })
});
// ===============================================
//PUT
export const updateCafe = catchAsync(async (req,res) =>{
        const { id } = req.params;
        const cafe = await cafeService.updateCafe(id, req.body);

        if(!cafe) {
            return next(new AppError("Không tìm thấy quán cafe",404))
        }
        return res.status(200).json({
            success: true,
            message: `Cập nhật thông tin quán "${cafe.name}" thành công`,
            data: cafe
        })
});
// ===============================================
//DELETE
export const deleteCafe = catchAsync(async (req,res) => {
        const {id} = req.params;
        const cafe = await cafeModel.deleteCafe(id);

        return res.status(200).json({
            success: true,
            message: "Xóa quán cafe thành công",
            data: cafe
        });
});
// ===============================================


export default { getCafes, getCafeById,createCafe,updateCafe, deleteCafe }
