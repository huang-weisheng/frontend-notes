import mysql from 'mysql2';
const pool=mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'hyx_db',
});
pool.query('select b.id , b.name, a.id, a.name from animal_table a  join user_table b  on  b.id=a.id',(error,results,fields) => {
	if(error) {
		throw error
	}
	console.log(results);
	// console.log(fields);
});
// 应用程序结束时关闭连接池
process.on('exit',() => {
	pool.end(error => {
		if(error) {
			console.error('Error closing the database connection pool:',error);
		} else {
			console.log('Database connection pool closed.');
		}
	});
});
