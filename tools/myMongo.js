/**
 * 这个文件主要集中了mongodb的操作
 */
var mongoclient = require("mongodb").MongoClient;
var dbhost = 'mongodb://localhost:27017/indexGo';

exports.hubLinks = "hubLinks";
exports.dbaticles = "DBAticles";
/**
 * 向mongo查询数据
 * db，是为了向上继承数据。。。
 * col 字符串，说明要连接的集合的名字
 * whereStr 懂sql数据库就好，用于删选的语句
 * callback 是回调函数用于处理数据，那么在查询的过程服务器就不用等待了
 */
exports.selectData = function(db,col,whereStr,callback){
	var collection = db.collection(col);
	
	collection.find(whereStr).toArray(function(err,result){
		if(err){
			console.log("Error:"+err);
//            console.log(result);
			return;
		}
		//传入db，方便用户关闭db
		callback(db,err,result);
	});
}

/**
 * 向mongodb插入数据
 * db是为了向上集成db对象
 * col 字符串，说明连接的集合名字
 * insertStr 是插入数据库的语句，这是一个js对象的数组[{},{}]
 * callback 回调函数用于处理数据，跳过等待数据库服务器响应
 */
exports.insertData = function(db,col,insertStr,callback){
	var collection = db.collection(col);
	collection.insert(insertStr, function(err, result) { 
		if(err)
		{
			console.log('Error:'+ err);
			return;
		}     
		callback(db,err,result);
	});
}
/**
 * 删除mongodb中的数据
 * db是为了向上继承db对象
 * col 字符串量 说明要连接的集合的名字
 * whereStr 是删选删除文档的字符串
 * callback 回调函数用于处理数据后的动作，跳过了等待数据库服务器的响应
 */
exports.removeData = function(db,col,whereStr,callback){
	var collection = db.collection(col);
	collection.remove(whereStr,function(err,result){
		if(err){
			console.log("Error:"+err);
		}
		callback(db,err,result);			//在callback中放err，不错，可以根据判断响应客户端
	});
}

/**
 * col ,要操作集合
 * whereStr，在哪个记录更新
 * updataStr，更新的语句
 * callback，回调
 * 因为这里需要两个str，所以和其他三个函数的接口不同，故不可以使用exe
 */
exports.updata = function(col,whereStr,updataStr,callback){
	mongoclient.connect(dbhost,function(err,db){
		var collection = db.collection(col);
		collection.update(whereStr,updataStr,function(err,result){
			if(err)
			{
				console.log('Error:'+ err);
				return;
			} 
			callback(db,err,result);
		});
//		console.log("连接成功！！");
	});
}


/**
 * 将查询、删除、插入做成同意接口函数
 * col,要操作的集合
 * someStr，操作的语句，对于删除和查询是sql中where
 * whatdo,需要的操作，这是一个函数变量。。。只接受查询，删除，和插入。。不接受更新 需要从这个文件中选择操作函数
 * thendo，操作完数据库后需要的操作
 */
exports.exe = function(col,someStr,whatdo,thendo){
	mongoclient.connect(dbhost,function(err,db){
		console.log("连接成功！！");
		whatdo(db,col,someStr,thendo);
	});
}


