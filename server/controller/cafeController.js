const cafeModel = require('../models/cafes');
const cafeService = require('../services/cafes')



//GET
// ===============================================
const getCafes = async (req, res) => {
    try{
        const { page, limit } = req.query;
        const result = await cafeModel.findAllCafes({ page, limit });
        res.json({
            success: true,
            message: 'Get all cafes successfully',
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


const getCafeById = async (req, res) => {
    try{
        const result = await cafeModel.findCafeById(req.params.id);
        if(!result){
            return res.status(404).json({
                success: false,
                message: 'Cafe spot not found !'
            })
        }
        res.json({
            success: true,
            message: 'Cafe spot found successfully',
            data: result
        })
    }
    catch(err){
        console.error('getCafeById error',err);
        res.status(500).json({
            success: false,
            message : 'Server error'
        })
    }
}

// ===============================================
//POST
const createCafe = async () => {
    try{
         const { owner_id, name, slug, description, address, district, latitude, longitude, phone, website, open_time, close_time, price_min, price_max, wifi, has_parking } = req.body 

         const cafe = await cafeService.createCafe({
             owner_id, name, slug, description, address, district, latitude, longitude, phone, website, open_time, close_time, price_min, price_max, wifi, has_parking 
         })

         return res.status(201).json({
            success: true,
            message: `Thêm quán cafe thành công`,
            data: cafe
         })
    }catch(err){
        console.error("error createCafe function (controller)",err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
// ===============================================
//PUT
const updateCafe = async (req,res) =>{
    try{
        const { id } = req.params;
        const cafe = await cafeService.updateCafe(id, req.body);

        if(!cafe) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy quán cafe"
            });
        }
        return res.status(200).json({
            success: true,
            message: `Cập nhật thông tin quán "${cafe.name}" thành công`,
            data: cafe
        })


    }catch(err){
        console.error("error updateCafe function (controller)",err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
// ===============================================
//DELETE
const deleteCafe = async (req,res) => {
    try{
        const {id} = req.params;
        const cafe = await cafeModel.deleteCafe(id);

        return res.status(200).json({
            success: true,
            message: "Xóa quán cafe thành công",
            data: cafe
        });
    } catch(err){
        console.error("error deleteCafe function (controller)",err)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
// ===============================================



module.exports = { getCafes, getCafeById,createCafe,updateCafe, deleteCafe }
