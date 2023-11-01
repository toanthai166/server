const allRoles = {
  user: ['changeFavoriteBlog', 'comment', 'favorite', 'feedback', 'address', 'order', 'addToCart'],
  manager: ['detele'],
  admin: [
    'changeFavoriteBlog',
    'getUsers',
    'manageUsers',
    'changeActiveBlog',
    'createBlog',
    'category',
    'product',
    'faq',
    'order',
    'image',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
