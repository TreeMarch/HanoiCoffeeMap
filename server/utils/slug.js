// Chuyển tên tiếng Việt thành slug
const generateSlug = (text) => {
  return text
    .normalize('NFD')                          // tách dấu ra khỏi chữ
    .replace(/[\u0300-\u036f]/g, '')           // xoá dấu
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')    // xử lý chữ đ riêng
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')             // chỉ giữ chữ, số, khoảng trắng, gạch ngang
    .replace(/\s+/g, '-')                      // khoảng trắng → gạch ngang
    .replace(/-+/g, '-')                       // nhiều gạch ngang → 1 gạch ngang
}

export default { generateSlug }