import { createWebHistory, createRouter } from "vue-router";
import Body from "../components/body";

// Documents
import DocumentList from "../pages/documents/DocumentList.vue";
import Form from "../pages/documents/Form.vue";


// Customers
import CustomerList from "../pages/customers/CustomerList.vue";
import FormClient from "../pages/customers/Form.vue";


// Users
import UserList from "../pages/users/UserList.vue";


// error
import Error400 from "../pages/error/error400";
import Error401 from "../pages/error/error401";
import Error403 from "../pages/error/error403";
import Error404 from "../pages/error/error404";
import Error500 from "../pages/error/error500";
import Error503 from "../pages/error/error503";

/* Authentication */
import LoginOne from "../pages/authentication/login_one";
import LoginTwo from "../pages/authentication/login_two";
import LoginValidate from "../pages/authentication/login_validation.vue";
import LoginTooltip from "../pages/authentication/login_tooltip.vue";

import RegisterImage from "../pages/authentication/register_image";
import RegisterImage2 from "../pages/authentication/register_image2";
import Unlock from "../pages/authentication/unlock";

/* Auth */
import login from "../auth/login";
import RegisterCompany from "../auth/register";
import Recovery from "../auth/recovery";
import ResetPassword from "../auth/reset";
import Confirm from "../auth/confirm";


const routes = [
  {
    path: "/",
    component: Body,

    children: [
      {
        path: "",
        name: "defaultRoot",
        component: DocumentList,
      },
    ],
  },

  {
    path: "/documents",
    component: Body,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        name: "documents:list",
        component: DocumentList,
        meta: {
          title: "Lista de documentos",
        },
      },

      {
        path: "edit/:id",
        name: "documents:edit",
        component: Form,
        meta: {
          title: "chart Dashboard",
        },
      },
    ],
  },



  {
    path: "/customers",
    component: Body,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "list",
        name: "customers:list",
        component: CustomerList,
        meta: {
          title: "Lista de Clientes",
        },
      },
      {
        path: "edit/:id",
        name: "customers:edit",
        component: FormClient,
        meta: {
          title: "Editar Cliente",
        },
      },
      {
        path: "add/",
        name: "customers:add",
        component: FormClient,
        meta: {
          title: "Adicionar Cliente",
        },
      },
    ],
  },

  {
    path: "/error-400",
    name: "Error400",
    component: Error400,
    meta: {
      title: "Error400 | Cuba - Premium Admin Template",
    },
  },

  {
    path: "/error-401",
    name: "Error401",
    component: Error401,
    meta: {
      title: "Error401 | Cuba - Premium Admin Template",
    },
  },

  {
    path: "/error-403",
    name: "Error403",
    component: Error403,
    meta: {
      title: "Error403 | Cuba - Premium Admin Template",
    },
  },

  {
    path: "/error-404",
    name: "Error404",
    component: Error404,
    meta: {
      title: "Error404 | Cuba - Premium Admin Template",
    },
  },

  {
    path: "/error-500",
    name: "Error500",
    component: Error500,
    meta: {
      title: "Error500 | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/error-503",
    name: "Error503",
    component: Error503,
    meta: {
      title: "Error503 | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/login/one",
    name: "LoginOne",
    component: LoginOne,
    meta: {
      title: "LoginOne | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/login/two",
    name: "LoginTwo",
    component: LoginTwo,
    meta: {
      title: "LoginTwo | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/login/validate",
    name: "LoginValidate",
    component: LoginValidate,
    meta: {
      title: "LoginValidate | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/login/tooltip",
    name: "LoginTooltip",
    component: LoginTooltip,
    meta: {
      title: "LoginTooltip | Cuba - Premium Admin Template",
    },
  },

  {
    path: "/authentication/register/image",
    name: "RegisterImage",
    component: RegisterImage,
    meta: {
      title: "RegisterImage | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/register/image2",
    name: "RegisterImage2",
    component: RegisterImage2,
    meta: {
      title: "RegisterImage2 | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/authentication/unlockuser",
    name: "Unlock",
    component: Unlock,
    meta: {
      title: "Unlock | Cuba - Premium Admin Template",
    },
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        name: "Login 1",
        component: login,
        meta: {
          title: " login | Cuba - Premium Admin Template",
        },
      },
   
      {
        path: "add",
        name: "add",
        component: RegisterCompany,
        meta: {
          title: "add",
        },
      },

      {
        path: "recovery",
        name: "recovery",
        component: Recovery,
        meta: {
          title: "recovery",
        },
      },

      {
        path: "confirm/:id",
        name: "confirm",
        component: Confirm,
        meta: {
          title: "confirm",
        },
      },

      {
        path: "resetpassword",
        name: "register 1",
        component: ResetPassword,
        meta: {
          title: " Register",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // base: '/cuba-vue/',
});
router.beforeEach((to, from, next) => {
  const path = ["/auth/login", "/auth/add", "/auth/recovery", "/auth/resetpassword/", "/auth/confirm/"];

  if (path.includes(to.path) || localStorage.getItem("User") || to.path.startsWith('/auth')) {
    return next();
  }
  next("/auth/login");
});
export default router;
