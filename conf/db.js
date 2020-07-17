const env = process.env.NODE_ENV; //环境参数

let MYSQL_CONF;
let REDIS_CONF;
//开发环境
if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "941016",
    database: "myblog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}
//线上环境
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "941016",
    database: "myblog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
