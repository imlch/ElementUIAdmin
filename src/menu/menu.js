let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: '首页',
  path: '/',
  icon: 'fa fa-tachometer',
};


/**
 * 科研人员管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.font_icon = {
  name: '研究室管理',
  icon: 'fa fa-th',
  children: {}
};
let icon = menu.font_icon.children;

icon.category = {
  name: '研究室管理',
  path: '/category_manage',
};
icon.font_awesome = {
  name: '主任',
  path: '/font_awesome',

};
icon.element_icon = {
  name: '秘书',
  path: '/element_icon',
};

/**
 * 科研项目管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.content_manage = {
  name: '科研项目管理',
  icon: 'fa fa-file-text-o',
  children: {}
};

let ContentManage = menu.content_manage.children;

ContentManage.post = {
  name: '项目列表',
  path: '/post_manage',
};
ContentManage.category = {
   name: '分类管理',
   path: '/category_manage',
 };
 ContentManage.message = {
   name: '留言管理',
   path: '/message_manage',
 };


/**
 * 科研人员管理
 * @type {{name: string, icon: string, children: {}}}
 */
menu.user_manage = {
  name: '科研人员管理',
  icon: 'fa fa-user-circle-o',
  children: {}
};
let UserManage = menu.user_manage.children;

UserManage.user = {
  name: '科研人员列表',
  path: '/user_manage',
};



menu.category_manage = {
  name: '科研成果管理',
  icon: 'fa fa-sitemap',
  children: {}
};
let CategoryManage = menu.category_manage.children;

CategoryManage.list = {
  name: '成果列表',
  path: '/user_manage',
};
CategoryManage.category = {
  name: '分类管理',
  path: '/category_manage',
};



export default menu;