const modelProduct = require("../models/Product");

const listProduct = async (req, res, next) => {
    const data = await modelProduct.find();
    res.json(data);
}

const detailProductFindId = async (req, res, next) => {
    const idProduct = req.query.id;
    const data = await modelProduct.find({_id: idProduct});
    res.json(data);
}

const detailProductFindById = async (req, res, next) => {
    const idProduct = req.query.id;
    const data = await modelProduct.findById(idProduct);
    res.json(data);
}

const findByIdAndDelete = async (req, res, next) => {
    const idProduct = req.params.id;
    try {
        const deletedProduct = await modelProduct.findByIdAndDelete({_id: idProduct});
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa.' });
        }
        return res.status(200).json({ message: 'Xóa sản phẩm thành công.', deletedProduct });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    }
}

const findByIdAndUpdate = async (req, res, next) => {
    const idProduct = req.query.id;
    const nameUpdate = req.body.productName;
    const priceUpdate = req.body.productPrice;
    try {
        const updatedProduct = await modelProduct.findByIdAndUpdate(
            idProduct,
            { name: nameUpdate, price: priceUpdate },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật.' });
        }
        return res.status(200).json({ message: 'Cập nhật thông tin sản phẩm thành công.', updatedProduct });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật sản phẩm.' });
    }
}


const findOne = async (req, res, next) => {
    const idProduct = req.query.id;
    try {
        const product = await modelProduct.findOne({ _id : idProduct });
        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
}


module.exports = {
    listProduct,
    detailProductFindId,
    detailProductFindById,
    findByIdAndDelete,
    findByIdAndUpdate,
    findOne
}
