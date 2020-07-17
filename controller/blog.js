const xss = require("xss");
const { exec } = require("../db/mysql");
//获取所有博客列表数据
const getList = async (author, keyword) => {
  let sql = `select * from blog where 1=1 `;
  if (author) {
    sql += `and author ='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += "order by createtime desc";
  return await exec(sql);
};
//获取博客详情
const getDetail = async (id) => {
  let sql = `select * from blog where id='${id}' order by createtime desc`;
  const row = await exec(sql);
  return row[0];
};
//新增博客
const newBlog = async (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createtime = Date.now();
  let sql = `insert into blog (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}')`;
  const insertData = await exec(sql);
  if (insertData) {
    return {
      id: insertData.insertId,
    };
  }
};
//更新博客
const updateBlog = async (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const sql = ` update blog set title='${title}',content='${content}' where id='${id}' `;
  const updateData = await exec(sql);
  if (updateData) {
    return updateData.affectedRows > 0 ? true : false;
  }
};
//删除博客
const deleteBlog = async (id, author) => {
  const sql = `delete from blog where id='${id}' and author='${author}'`;
  const deleteData = await exec(sql);
  if (deleteData) {
    return deleteData.affectedRows > 0 ? true : false;
  }
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
