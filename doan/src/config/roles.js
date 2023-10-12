const allRoles = {
  user: ['changeFavoriteBlog', 'comment'],
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
