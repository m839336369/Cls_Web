import Login from "pages/Login.vue";
import Register from "pages/Register.vue";
import Authentication from "layouts/Authentication.vue";
import ImageClassification from "layouts/ImageClassification.vue";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "user",
        component: Authentication,
        children: [
          { path: "login/:register_username?", component: Login, props: true },
          {
            path: "register/:login_username?",
            component: Register,
            props: true,
          },
        ],
      },
      {
        path: "image/:user_id",
        component: ImageClassification,
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    redirect: "/user/login",
  },
];

export default routes;
