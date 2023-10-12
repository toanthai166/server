const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const blogRoute = require('./blog.route');
const categoryRoute = require('./category.route');
const commentRoute = require('./comment.route');
const faqRoute = require('./faq.route');
const productRoute = require('./product.route');
const imageRoute = require('./image.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/blog',
    route: blogRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/comment',
    route: commentRoute,
  },
  {
    path: '/faq',
    route: faqRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/upload-image',
    route: imageRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
