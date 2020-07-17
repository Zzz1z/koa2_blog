const router = require("koa-router")();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { loginCheck } = require("../middleware/loginCheck");
router.prefix("/api/blog");

//获取所有博客列表
router.get("/list", async (ctx, next) => {
  const author = ctx.query.author || "";
  const keyword = ctx.query.keyword || "";
  //管理员界面
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      //未登录的情况下
      ctx.body = new ErrorModel("未登录");
      return;
    }
    // 强制查询自己的博客数据
    author = ctx.session.username;
  }
  const listData = await getList(author, keyword);
  if (listData) {
    ctx.body = new SuccessModel(listData);
  }
});
//获取博客详情
router.get("/detail", async (ctx, next) => {
  const data = await getDetail(ctx.query.id);
  if (data) {
    ctx.body = new SuccessModel(data);
  }
});
//新建博客
router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  body.author = ctx.session.username;
  const data = await newBlog(body);
  ctx.body = new SuccessModel(data);
});
//更新博客
router.post("/update", loginCheck, async (ctx, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("更新失败~");
  }
});
//删除博客
router.post("/delete", loginCheck, async (ctx, next) => {
  const author = ctx.session.username;
  const id = ctx.query.id;
  const val = await deleteBlog(id, author);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel();
  }
});

module.exports = router;
