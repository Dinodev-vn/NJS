const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId; //sinh ra 1 dãy id ngẫu nhiên mỗi khi add data
const category = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // không được trùng
        trim: true, // bỏ khoảng trắng 2 đầu
        minlength: 3, // độ dài tối thiểu
        maxlength: 50, // độ dài tối đa
        default: 'No name' // giá trị mặc định
    },
});
module.exports = mongoose.models.category || mongoose.model('category', category);
// category -----> categories
