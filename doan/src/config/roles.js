const allRoles = {
  user: ['changeFavoriteBlog', 'comment', 'favorite', 'feedback'],
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
    'image',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
