/*
 * GET home page.
 */


exports.index = function(req, res){
//  res.render('public/indexGo/index', { title: 'Express' });
	res.sendfile('public/indexGo/index.html');
};

exports.codes = require("./codes.js").codes;

exports.sendDBLearnText = require("./databases/databasesLearn.js").sendText;

exports.codeBavi = require("./codeBavi.js").codeBavi;


exports.PAT1 = require("./PAT1.js").PAT1;
exports.data_structure = require("./data_structure").data_structure;
exports.jsStudy = require("./jsStudy").jsStudy;

//admin部分
exports.codeInsert = require("./admin/codeInsert.js").codeInsert;
exports.admin = require("./admin/admin.js").admin;
exports.Login = require("./admin/Login").Login;
exports.Logout = require("./admin/Logout.js").Logout;
exports.showAllCode = require("./admin/showAllCode.js").showAllCode;
exports.addlanguage = require("./admin/codeUpdata.js").addlanguage;
exports.delLink = require("./admin/codeUpdata.js").delLink;
exports.getDBText = require("./admin/databases/updataDBText").getDBText;
exports.articletype = require('./admin/dealjson.js').articletype;


//用于中间件，过滤作用
exports.authFilter = require("./admin/authFilter.js").authFilter;