import Vue from 'vue'
import Router from 'vue-router'

/* 导入login组件 */
import Login from "@/components/Login";
import Home from "@/components/Home";
import Welcome from "@/components/Welcome";

/* 用户 */
import Users from "@/components/users/Users";
Vue.use(Router)

const router = new Router({
  routes: [
    
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/home", component: Home, redirect: "/welcome", children: [
        { path: "/welcome", component: Welcome },
        { path: "/users", component: Users },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(from, 666);
  console.log(to, 555);
  if (to.path == "/login") return next();

  /* 接下来可能取得地方不是login    可能是其他页面   判断有没登录 */
  var token = window.sessionStorage.getItem("token")
  if (!token) return next("/login")
  next();
})


export default router


