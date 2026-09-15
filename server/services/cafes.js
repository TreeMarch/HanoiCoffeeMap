import CafeModel from "../models/cafes.js"
import generateSlug from "../utils/slug.js";


const cafeService = {

    async createCafe(data){
        const {
        owner_id,
        name,
        slug,
        description,
        address,
        district,
        latitude,
        longitude,
        phone,
        website,
        open_time,
        close_time,
        price_min,
        price_max,
        wifi,
        has_parking
    } = data;
    return CafeModel.createCafe(owner_id, name, slug, description, address, district, phone, website, latitude, longitude, open_time, close_time, price_min, price_max, wifi, has_parking)
    },

    //tao slug tu ten cua quan cafe
    async generateUniqueSlug(name,excludeId = null) {
        const baseSlug = generateSlug(name)
        let slug = baseSlug
        let counter = 2

        while (await CafeModel.slugExists(slug,excludeId)){
            slug = `${baseSlug}-${counter}`
            counter++
        }
        return slug;
    },

    // tao quan - service gan slug truoc khi goi model 
    async createSluCafe(data){
        const slug = await cafeService.generateUniqueSlug(data.name)
        return CafeModel.createCafe({...data,slug})
    },

    //cap nhat quan - neu ten thay doi thi gen ra slug moi 
    async updateCafe(id, fields){
        if(fields.name) {
            fields.slug = await cafeService.generateUniqueSlug(fields.name, id)
        }

        return CafeModel.updateCafe(id, fields)
    },

    // check gia tien min va max
    async validatePriceRange(price_min, price_max){
        if(price_min !== undefined && price_max !== undefined && price_min > price_max){
            throw new Error("Giá tối thiểu không được lớn hơn giá tối đa")
        }
    }

}

export default cafeService;