const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const sanpham = new Schema({
    id: { type: ObjectId }, //khóa chính
    name: { type: String },
    price: { type: Number },
    // category: { type: ObjectId, ref: 'category' } //khóa ngoại
});
module.exports = mongoose.models.product || mongoose.model('product', sanpham);
// product(js) -----> products(mongoDB)
