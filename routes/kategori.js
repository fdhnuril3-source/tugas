var express = require('express');
const connection = require('../config/database');
var router = express.Router();

router.get('/', function(req, res, next){
    connection.query('select * from kategori order by id_kategori desc', function(err, rows){

        res.render('kategori/index',
            {
                judul : 'Halaman Kategori',
                data: rows
            });
        });
});

router.get('/create', function(req, res, next){
    res.render('kategori/create');
});

router.get('/edit/(:id)', function(req, res, next){
    let id = req.params.id;
    connection.query('select * from kategori where id_kategori = ' + id, function(err, rows){
        if (err) {
            req.flash('error', 'Gagal memuat data');
        } else {
            res.render('kategori/edit', {
                id: rows[0].id_kategori,
                nama_kategori: rows[0].nama_kategori
            });
        }
    })
    
})

router.post('/store', function(req, res, next){
    let {nama_kategori}= req.body;
        let Data = {
            nama_kategori
        }
    connection.query('insert into kategori set ?', Data, function(err, result){
        if (err) {
            req.flash('error', 'Gagal Menyimpan Data');
        } else {
            req.flash('success', 'Berhasil Menyimpan Data');
        }
        res.redirect('/kategori');
    })
        
})

router.post('/update/(:id)', function(req, res, next){
    try {
        let id = req.params.id;
        let {nama_kategori}= req.body;
        let Data = {
            nama_kategori
        }
    connection.query('update kategori set ? where id_kategori = ' + id, Data, function(err, result){
        if (err) {
            req.flash('error', 'Gagal Memperbarui Data');
        } else {
            req.flash('success', 'Berhasil Memperbarui Data');
        }
        res.redirect('/kategori');
    })
} catch (error) {
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/kategori');
}
})
    


module.exports = router;