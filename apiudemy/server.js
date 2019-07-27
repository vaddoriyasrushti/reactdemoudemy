const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
//const ignoreFavicon = require('./ignoreFavicon');

const cartRoute = require('./routes/cart.route');
const categoriesRoute = require('./routes/categories.route');
const subcategoriesRoute = require('./routes/subcategories.route');
const authRoute = require('./routes/auth.route');
const subcatsnameRoute = require('./routes/subcatsname.route');

global.__basedir = __dirname;

var ImageDir = path.join(__dirname, '/images');
app.use(express.static(ImageDir));

var ThumbnailImageDir = path.join(__dirname, '/images/thumbnailImages');
app.use(express.static(ThumbnailImageDir));


//let ImageDir = require('path').join(__dirname, '/images/');
//app.use('/images', express.static(ImageDir));
//app.use(cors(), ignoreFavicon, bodyParser());
app.use(cors());
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));

app.use('/cart', cartRoute);
app.use('/categories', categoriesRoute);
app.use('/subcategories', subcategoriesRoute);
app.use(authRoute);
app.use('/images', express.static(ImageDir));
app.use('/images/thumbnail', express.static(ThumbnailImageDir));
app.use('/subcat', subcatsnameRoute);


const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server ready at port ${PORT}`);
});