var express = require('express');
var router = express.Router();
module.exports = router;


var modelProduct = require("../models/Product");


// Lấy danh sách tấc cả sản phẩm
//http://localhost:3000/productsAPI/listProduct
router.get('/listProduct', async function(req, res, next) {
    var data = await modelProduct.find();
    res.json(data);
});


// 1. find(): trả về chi tiết sản phẩm theo id trả về mảng các sản phẩm thỏa mãn truy vấn
//http://localhost:3000/productsAPI/detailProductFind_id?id=......
router.get('/detailProductFind_id', async function(req, res, next) {
    var idsp = req.query.id;
    var data = await modelProduct.find({_id: idsp}); //lưu ý ghi `_`
    // var data = await modelProduct.find({}, 'a,b,c'); // lấy sp theo id và lấy... {}: tương đương _id, abc là các thuộc tính cần lấy cách nhau dấu phẩy
    res.json(data);
});


// 2. findById():  tìm kiếm một document cụ thể duy nhất trong collection dựa trên _id
//http://localhost:3000/productsAPI/detailProductFindById?id=......
router.get('/detailProductFindById', async function(req, res, next) {
    var idsp = req.query.id;
    var data = await modelProduct.findById(idsp); 
    res.json(data);
});

// 3. findByIdAndDelete(): tìm kiếm và xóa một document từ collection dựa trên giá trị _id.
//http://localhost:3000/productsAPI/findByIdAndDelete?id=......
router.delete('/findByIdAndDelete/:id', async function(req, res, next) {
    var idsp = req.params.id;

    try {
        // Sử dụng findByIdAndDelete() để tìm và xóa document dựa trên id
        const deletedProduct = await modelProduct.findByIdAndDelete({_id: idsp});

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa.' });
        }

        return res.status(200).json({ message: 'Xóa sản phẩm thành công.', deletedProduct });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    }
});


// 4. findByIdAndUpdate(): tìm kiếm và cập nhật một document trong collection dựa trên giá trị _id. trả về document sau khi đã cập nhật (nếu có) 
//http://localhost:3000/productsAPI/findByIdAndUpdate?id=......
router.put('/findByIdAndUpdate', async (req, res) => {
    var idsp = req.query.id; 
    const nameUpdate = req.body.productName;
    const priceUpdate = req.body.productPrice;

    try {
        // Sử dụng findByIdAndUpdate() để tìm và cập nhật document dựa trên id
        const updatedProduct = await modelProduct.findByIdAndUpdate(
            idsp, 
            { name: nameUpdate, price: priceUpdate }, 
            { new: true } //value = true: trả về document sau khi update. 
            );
                                                                                        
        // niếu false -> true và chạy xử lí, niếu updatedProduct != null sẽ true -> false và không chạy xử lí
        if (!updatedProduct) {
            return res.status(404).send('Không tìm thấy sản phẩm để cập nhật.');
        }

        return res.status(200).send('Cập nhật thông tin sản phẩm thành công.');
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        return res.status(500).send('Đã xảy ra lỗi khi cập nhật sản phẩm.');
    }
});


// 5. findOne(): tìm một document duy nhất và đầu tiên trong collection dựa trên các điều kiện. trả về null nếu không tìm thấy bất kỳ document nào.
// //http://localhost:3000/productsAPI/findOne?id=......
router.get('/findOne', async (req, res) => {
    try {
        const idsp = req.query.id; // Lấy tên sản phẩm từ query parameter trong URL

        // Tìm sản phẩm trong collection dựa trên tên sản phẩm
        const product = await modelProduct.findOne({ _id: idsp });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Nếu tìm thấy sản phẩm, trả về thông tin của sản phẩm
        return res.status(200).json(product);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
});

// 6. findOneAndDelete(): tìm và xóa một document đầu tiên trong collection dựa trên các điều kiện. Sau khi document được xóa, phương thức này trả về document đã bị xóa.
//http://localhost:3000/productsAPI/findOneAndDelete?id=......
router.get('/findOneAndDelete', async (req, res) => {
    try {
        const idsp = req.query.id; // Lấy tên sản phẩm từ query parameter trong URL

        // Tìm và xóa sản phẩm trong collection dựa trên tên sản phẩm
        const product = await modelProduct.findOneAndDelete({ _id: idsp });

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }

        // Nếu tìm thấy và xóa sản phẩm, trả về thông tin của sản phẩm đã bị xóa
        return res.status(200).json(product);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm và xóa sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm và xóa sản phẩm.' });
    }
});

// 7. findOneAndUpdate (): tìm và cập nhật một document đầu tiên trong collection dựa trên các điều kiện. Sau khi document được cập nhật, phương thức này sẽ trả về document đã được cập nhật.
//http://localhost:3000/productsAPI/findOneAndUpdate?id=......
router.put('/findOneAndUpdate', async (req, res) => {
    try {
        const idsp = req.query.id; // Lấy tên sản phẩm từ query parameter trong URL
        const newName = req.query.name; // Lấy tên sản phẩm từ query parameter trong URL
        const newPrice = req.body.price; // Lấy giá mới từ body của request

        // Tìm và cập nhật sản phẩm trong collection dựa trên tên sản phẩm
        const updatedProduct = await modelProduct.findOneAndUpdate(
            { name: idsp }, // Điều kiện tìm kiếm
            { $set: {name: newName, price: newPrice } }, // Dữ liệu mới cần cập nhật
                //không dùng $set: { name: newName, price: newPrice }
            { new: true } // Tùy chọn: Trả về document sau khi cập nhật
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy hoặc cập nhật sản phẩm.' });
        }

        // Nếu tìm thấy và cập nhật sản phẩm, trả về thông tin của sản phẩm đã được cập nhật
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm và cập nhật sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm và cập nhật sản phẩm.' });
    }
});

// 8. findByIdAndReplace(): tìm và thay thế một document trong collection dựa trên một ID được chỉ định. Khi document được tìm thấy, nó sẽ được thay thế hoàn toàn bằng một document mới mà bạn cung cấp.
//http://localhost:3000/productsAPI/findByIdAndReplace?id=......
router.put('/findByIdAndReplace', async (req, res) => {
    try {
        const idsp = req.query.id; // Lấy tên sản phẩm từ query parameter trong URL
        const newName = req.body.nameInput; // Lấy dữ liệu mới của sản phẩm từ body của request
        const newPrice = req.body.priceInput; // Lấy dữ liệu mới của sản phẩm từ body của request

        // Tạo document mới từ dữ liệu người dùng gửi
        const newProductData = new modelProduct({name: newName, price: newPrice});

        // Thực hiện thay thế sản phẩm dựa trên ID
        const replacedProduct = await modelProduct.findByIdAndReplace(idsp, newProductData, { new: true });

        if (!replacedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy hoặc thay thế sản phẩm.' });
        }

        // Trả về thông tin của sản phẩm sau khi thay thế
        return res.status(200).json(replacedProduct);
    } catch (error) {
        console.error('Lỗi khi thay thế sản phẩm:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi thay thế sản phẩm.' });
    }
});

//------------------------------------------------------------------------------------------------------------------
router.get('/', async function(req, res, next) {
    var data = await modelProduct.find();
    res.render('lab', { data: data });
  });

// Chi tiết sản phẩm theo price < input
//http://localhost:3000/productsAPI/detailProductFind_price?price=......
router.get('/detailProductFind_price', async function(req, res, next) {
    var price = req.query.inputPrice;
    var data = await modelProduct.find({ price: { $lt: price } });
    res.render('lab', { ds: data });
});
// Chi tiết sản phẩm theo price từ X đến Y
//http://localhost:3000/productsAPI/detailProductFind_priceXY......
router.get('/detailProductFind_priceXY', async function(req, res, next) {
    var priceX = req.query.getX;
    var priceY = req.query.getY;
    var data = await modelProduct.find({ price: { $gte: priceX, $lte: priceY } });
    res.render('lab', { ds: data });
});
// Chi tiết sản phẩm trong tên có từ hoa
//http://localhost:3000/productsAPI/detailProductFind_hoa
router.get('/detailProductFind_hoa', async function(req, res, next) {
    var data = await modelProduct.find({ name: { $regex: /hoa/i } });
    res.render('lab', { ds: data });
});
//----------------------------------------------------------------------------------------------------------------------





  // *biến query, biến nhận giá trị từ query để truy vấn và biến là key trong collection
  
  