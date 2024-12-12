import mysql from 'mysql2';
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	port: 3306,
	password: '123456',
	database: 'hyx_db',
});
//查询语句
const query = 'select b.id , b.name, a.id, a.name from animal_table a  join user_table b  on  b.id=a.id';
//执行查询
pool.query(query, (error, results, fields) => {
	if (error) { throw error; }
	console.log(results);
});
// 应用程序结束时关闭连接池
process.on('exit', () => {
	pool.end(error => {
		if (error) {
			console.error('Error closing the database connection pool:', error);
		} else {
			console.log('Database connection pool closed.');
		}
	});
});
//五秒后退出
setTimeout(() => {
	process.exit(0);
}, 5000);
