var mysql = require('mysql');

module.exports = {

	createPool: function(obj) {
		return mysql.createPool(obj);
	},
	//构架数据库连接池


	sever: function(pool, sqlString, fn) {
		console.log(sqlString);
		pool.getConnection(function(err, connection) {
			if (err) {
				throw err;
			} else {
				connection.query(sqlString, function(err, rows) {
					if (err) {
						throw err;
					} else {
						fn(rows);
					}
					connection.release();
					//异步释放连接
				});
			}
		});
	},
	//数据库操作应用

	escape: mysql.escape,

	select: function(type, table, where) {
		if (where) {
			return "SELECT " + type.join(",") + " FROM " + table + " WHERE " + where;
		} else {
			return "SELECT " + type.join(",") + " FROM " + table;
		}

	},
	//查询语句拼接

	insert: function(table, type, value, ignore) {

		if (ignore == true) {
			return "INSERT IGNORE INTO " + table + " (" + type.join(",") + ") VALUES (" + value.join(",") + ")";
		}
		return "INSERT INTO " + table + " (" + type.join(",") + ") VALUES (" + value.join(",") + ")";

	},
	//插入语句拼接

	update: function(table, type, value, where) {

		for (var i = 0; i < value.length; i++) {
			type[i] = type[i] + "=" + value[i];
		}
		if (where) {
			return "UPDATE " + table + " SET " + type.join(",") + " WHERE " + where;
		} else {
			return "UPDATE " + table + " SET " + type.join(",");
		}

	},
	//更新语句拼接


	del: function(table, where) {
		if (where) {
			return "DELETE FROM  " + table + " WHERE " + where;
		} else {
			return "DELETE FROM  " + table;
		}
	}
	//删除语句拼接
}
