const session = require("koa-generic-session");
const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
// const { loginCheck } = require("../middleware/loginCheck");
router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const loginResult = await login(username, password);
  if (loginResult.username) {
    ctx.session.username = loginResult.username;
    ctx.session.realname = loginResult.realname;
    ctx.body = new SuccessModel();
    return;
  }
  ctx.body = new ErrorModel("账号或者密码错误");
});
// router.get("/session-test", async function (ctx, next) {
//   if (ctx.session.count == null) {
//     ctx.session.count = 0;
//   }
//   ctx.session.count++;
//   ctx.body = {
//     errno: 0,
//     count: ctx.session.count,
//   };
// });

module.exports = router;
