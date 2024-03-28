var express = require('express');
var router = express.Router();

var danhsach = [
    { id: 1, name: "Bánh quy socola", price: 15000 },
    { id: 2, name: "Kẹo dẻo trái cây", price: 10000 },
    { id: 3, name: "Bánh ngọt hương vani", price: 12000 }
];


/* hiển thị trang danh sách sản phẩm */
router.get('/', function(req, res, next) {
  res.render('products', { sp: danhsach });
});

// hiển thị trang thêm sản phẩm
router.get('/add', function(req, res, next) {
    res.render('addProduct');
});

// xử lí thêm sản phẩm
router.post('/add', function(req, res, next) {
    var newID = Date.now();
    var {tenSP, giaSP} = req.body;
    danhsach.push({id: newID, name: tenSP, price: giaSP});
    res.redirect('./');
});

// hiển thị trang sửa
router.get('/edit', function(req, res, next) {
    // có id
    var idsp = req.query.id;
    // tìm vị trí index trong mảng
    const index = danhsach.findIndex(sp => sp.id == idsp);
    // lấy nó ra
    const spSua = danhsach[index]
    res.render('edit', {chitiet: spSua});
});

// xử lí sửa sản phẩm
router.post('/edit', function(req, res, next) {
    var {idSP, tenSP, giaSP } = req.body;
    // tìm vị trí index trong mảng
    const index = danhsach.findIndex(sp => sp.id == idSP);
    danhsach[index].name = tenSP;
    danhsach[index].price = giaSP;
    res.redirect('./');
});

// xóa sản phẩm
router.get('/delete', function(req, res, next) {
    // có id
    var idsp = req.query.id;
    // tìm vị trí index trong mảng
    const index = danhsach.findIndex(sp => sp.id == idsp);
    danhsach.splice(index, 1);
    res.redirect('./');
});

//lab
router.get('/lab', function(req, res, next) {
    res.render('lab', { sp: danhsach });
  });






module.exports = router;
