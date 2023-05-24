<script>
const baseURL = "http://124.221.73.192:8081";

const ApiList = {
  Login: "/user/login",
  Register: "/user/register",
  CLS: "/image/cls",
  Images: "/image/images",
  Comment: "/image/comment",
  DeleteImage: "/image/delete",
};

const base = function () {
  let api = {};
  for (let k in ApiList) {
    api[k] = baseURL + ApiList[k];
  }
  return api;
};

export default {
  ApiList: base(),
};
</script>
