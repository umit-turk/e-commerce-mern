const Product = require("../models/product.js");
const ProductFilter = require("../utils/productFilter.js");
const cloudinary = require("cloudinary").v2;

const allProducts = async (req, res) => {
    const resultPerPage = 10;
    const productFilter = new ProductFilter(Product.find(),req.query).search().filter().pagination(resultPerPage);
    try {
        const products = await productFilter.query;
        res.status(200).json({
            message: "Tüm ürünler başarıyla alındı",
            products: products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Ürünler alınırken bir hata oluştu",
            error: error.message,
        });
    }
};

const adminProducts = async (req,res,next) => {
    const products = await Product.find();
    try {
        res.status(200).json({
            products,
        })
    } catch (error) {
        
    }
}

const detailProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Belirtilen ID'ye sahip ürün bulunamadı",
            });
        }

        res.status(200).json({
            message: "Ürün başarıyla alındı",
            product: product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Ürün alınırken bir hata oluştu",
            error: error.message,
        });
    }
};

//admin
const createProduct = async (req, res, next) => {
    let images = [];
    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images;
    }

    let allImages = [];
    for(let i = 0; i < images.length; i++){
        const result = await cloudinary.uploader.upload(images[i],{
            folder:"products"
        })

        allImages.push({
            public_id:result.public_id,
            url:result.secure_url,
        })

    }
    req.body.images = allImages
    req.body.user = req.user.id

    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            message: "Ürün başarıyla oluşturuldu",
            product: product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Ürün oluşturulurken bir hata oluştu",
            error: error.message,
        });
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Belirtilen ID'ye sahip ürün bulunamadı",
            });
        }
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id)  
        }
        await product.deleteOne();

        res.status(200).json({
            message: "Ürün başarıyla silindi",
        });
    } catch (error) {
        res.status(500).json({
            message: "Silme işlemi sırasında bir hata oluştu",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    let images = [];
    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images;
    }

    if(images !== undefined){
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id)  
        }
    }

    let allImages = [];
    for(let i = 0; i < images.length; i++){
        const result = await cloudinary.uploader.upload(images[i],{
            folder:"products"
        })

        allImages.push({
            public_id:result.public_id,
            url:result.secure_url,
        })

        req.body.images = allImages
    }
    try {
        product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true})

        res.status(200).json({
            message:"Ürün başarıyla güncellendi",
            product,
        })
    } catch (error) {
        res.status(500).json({
            message: "Güncelleme işlemi sırasında bir hata oluştu",
            error: error.message,
        });
    }
};

const createReview = async (req, res, next) => {
    const {productId, comment, rating} = req.body;
    try {
        const review = {
            user:req.user._id,
            name:req.user.name,
            comment,
            rating: Number(rating),
        }
        const product = await Product.findById(productId);
        product.reviews.push(review);
        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating
        })

        product.rating = avg / product.reviews.length

        await product.save({validateBeforeSave:false})
        res.status(200).json({
            message:"Yorumun başarıyla eklendi",
        })

    } catch (error) {
        res.status(500).json({
            message: "Yorum ekleme sırasında bir hata oluştu",
            error: error.message,
        });
    }
}


module.exports = {allProducts, detailProduct, createProduct, deleteProduct, updateProduct, createReview, adminProducts};