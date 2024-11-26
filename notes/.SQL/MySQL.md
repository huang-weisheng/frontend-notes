## 启动和停止mysql服务

默认服务名: mysql80。

启动MySQL服务: net start mysql80
停止MySQL服务: net stop mysql80

## 客户端连接

* 方式一: 使用MySQL提供的客户端命令行工具 **MySQL 8.0 Command Line Client**
* 方式二：使用系统自带的命令行工具执行指令
	* `mysql [-h 127.0.0.1] [-P 3306] -u root -p`
		* -h : MySQL服务所在的主机IP,如果未提供此参数，默认使用本地主机。
		* -P : MySQL服务端口号,如果未提供此参数,使用 MySQL 默认的端口 3306
		* -u : 指定连接 MySQL 服务器时使用的用户名。-u root 表示使用用户名为 "root" 的用户连接。
		* -p : 使用密码登录: 123456

## SQL分类

### DDL (数据定义语言)

Data Definition Language,数据定义语言,用来定义数据库对象(数据库,表,字段) 。

#### 数据库操作

```sql
查询所有数据库: `show databases;`
查询当前连接所使用的数据库名称: `select database();`
删除数据库: `drop database [ if exists ] 数据库名 ;`
切换到数据库:` use 数据库名;`
创建数据库:` create database [ if not exists ] 数据库名 [ default charset 字符集 ] [ collate 排序规则 ]`
		- [ if not exists ] 参数表示如果数据库不存在, 则创建该数据库，如果存在，则不创建
		- [ default charset 字符集 ] 默认是 default charset utf8mb4
```

#### 表操作

(长度) 字段的是否可选取决于数据类型以及数据库管理系统的要求。

```sql
查询当前数据库所有表: SHOW TABLES;
查看到指定表结构:表的字段,字段的类型、是否可以为NULL,是否存在默认值等信息: DESC 表名 ;
查看建表语句: SHOW CREATE TABLE 表名 ;
添加表字段: ALTER TABLE 表名 ADD 字段名 类型 [(长度)] [ COMMENT 注释 ] [ 约束 ] ;
修改表字段数据类型: ALTER TABLE 表名 MODIFY 字段名 新数据类型 [(长度)];
修改表字段名和字段类型: ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型 [(长度)] [ COMMENT 注释 ] [ 约束 ];
删除字段: ALTER TABLE 表名 DROP 字段名;
修改表名: ALTER TABLE 表名 RENAME TO 新表名;
删除整个表: DROP TABLE [ IF EXISTS ] 表名;
清空表中的所有数据，但保留表的结构、索引、约束等定义。TRUNCATE TABLE 表名;
创建表结构;  [] 内为可选参数，最后一个字段后面没有逗号
	CREATE TABLE 表名(
	字段1 字段1类型 [ COMMENT 字段1注释 ],
	字段2 字段2类型 [ COMMENT 字段2注释 ],
	字段n 字段n类型 [ COMMENT 字段n注释 ]
	) [ COMMENT 表注释 ];
```

#### 数据类型

MySQL中的数据类型有很多,主要分为三类：数值类型、字符串类型、日期时间类型。

1. 数值类型
	- DOUBLE 8bytes 双精度浮点数值
2. 字符串类型
3. 日期时间类型


### DML (数据操作语言)

DML英文全称是Data Manipulation Language(数据操作语言)，用来对数据库中表的数据记录进行增、删、改操作。

```sql
添加数据:向数据库表中插入新的行或记录(指定字段), 字符串和日期型数据应该包含在引号中。
	INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
添加数据:将所有值按照表中字段的顺序插入,字符串和日期型数据应该包含在引号中。
	INSERT INTO 表名 VALUES (值1, 值2, ...);
批量添加数据:部分字段,字符串和日期型数据应该包含在引号中。	
	INSERT INTO 表名 (字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...);
批量添加数据:全部字段,字符串和日期型数据应该包含在引号中。
	INSERT INTO 表名 VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);
修改数据: 如果没有条件，则会修改整张表的所有数据。
	UPDATE 表名 SET 字段名1 = 值1 , 字段名2 = 值2  [ WHERE 条件 ];
删除数据: 如果没有条件，则会删除整张表的所有数据
	DELETE FROM 表名 [ WHERE 条件 ] ;
```

### DQL (数据查询语言)

DQL英文全称是Data Query Language(数据查询语言)，数据查询语言，用来查询数据库中表的记
录。

#### 比较运算符

- `>` ：大于。用于比较两个值，如果左边的值大于右边的值，则返回 `true`。
- `>=` ：大于等于。用于比较两个值，如果左边的值大于或等于右边的值，则返回 `true`。
- `<` ：小于。用于比较两个值，如果左边的值小于右边的值，则返回 `true`。
- `<=` ：小于等于。用于比较两个值，如果左边的值小于或等于右边的值，则返回 `true`。
- `=` ：等于。用于比较两个值，如果它们相等，则返回 `true`。
- `<>` 或 `!=` ：不等于。用于比较两个值，如果它们不相等，则返回 `true`。
- `BETWEEN ... AND ...` ：在某个范围之内（含最小、最大值）。
- `IN(...)` ：在 `IN` 后的列表中的值，多选一。
- `LIKE` ：占位符。用于进行模糊匹配，`_` 匹配单个字符，`%` 匹配任意个字符。
- `IS` ：用于检查一个值是否等于另一个值，常用于 NULL 值的比较。
- `IS NULL` ：用于检查一个值是否为 NULL。

#### 逻辑运算符

- `AND` 或 `&&`：并且。多个条件同时成立。
- `OR` 或 `||`：或者。多个条件任意一个成立。
- `NOT` 或 `!`：非，不是。

#### 基本语法:
```sql
SELECT
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
```

```sql
查询多个字段:
	SELECT 字段1, 字段2, 字段3  FROM 表名 ;
查询所有字段
	SELECT * FROM 表名 ;
字段设置别名:
	SELECT 字段1 [ AS 别名1 ] , 字段2 [ AS 别名2 ]  FROM 表名;
	SELECT 字段1 [ 别名1 ] , 字段2 [ 别名2 ] ... FROM 表名;
去除重复记录:
	SELECT DISTINCT 字段列表 FROM 表名;
条件查询:
	SELECT 字段列表 FROM 表名 WHERE 条件列表 ;
查询身份证最后一位是X的项:
	select * from emp where idcard like '%X';
	select * from emp where idcard like '_________________X';
```

#### 聚合函数

* 将一列数据作为一个整体，进行纵向计算,注意 : NULL值是不参与所有聚合函数运算的。
* 聚合函数通常与分组查询一起使用。当你想要对一组数据进行汇总统计时，聚合函数就会派上用场。而分组查询则用于将数据按照某个列或表达式进行分组，然后对每个分组应用聚合函数。

- `COUNT`：统计数量。用于计算某个列中非 NULL 值的行数。
- `MAX`：最大值。用于计算某个列中的最大值。
- `MIN`：最小值。用于计算某个列中的最小值。
- `AVG`：平均值。用于计算某个列中值的平均数。
- `SUM`：求和。用于计算某个列中值的总和。

```sql
SELECT 聚合函数(字段列表) FROM 表名 ;

统计的是总记录数
select count(*) from 表名;
统计的是id字段不为null的记录数
select count(id) from 表名;
统计的是id字段为age的平均数
select avg(age) from 表名;
统计age为18的行的id之和
select sum(id) from 表名 where age = 18;
```
#### 分组查询

分组查询用于将行分组为更小的集合，并对每个分组应用聚合函数以生成汇总结果。分组查询通常与聚合函数一起使用，以对数据进行汇总和分析。

* 分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。
* 执行顺序: where > 聚合函数 > having

where与having区别
* 执行时机不同: where是分组之前进行过滤,不满足where条件,不参与分组;而having是分组
之后对结果进行过滤。
* 判断条件不同: where不能对聚合函数进行判断,而having可以。
```sql
SELECT 字段列表 FROM 表名 [ WHERE 条件 ] GROUP BY 分组字段名 [ HAVING 分组后过滤条件 ];
根据性别分组 , 统计男性员工 和 女性员工的数量
select 性别, count(*) from 表名 group by 性别;
根据性别分组 , 统计平均年龄
select 性别, avg(年龄) from 表名 group by 性别;
查询年龄小于45的数据 , 并根据地址分组 , 获取数据量大于等于3的地址分组
select 地址, count(*) as 数量 from 表名 where 年龄 < 45 group by 地址 having 数量 > 3;
```

####  排序查询

* 排序在日常开发中是非常常见的一个操作，有升序排序，也有降序排序。
* 排序方式: ASC: 升序(默认值) ,DESC: 降序 ,
* 如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序 ;

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1 , 字段2 排序方式2;
根据字段1, 对数据进行降序排序
select * from 表名 order by 字段1 desc;
根据字段1对数据进行升序排序 , 字段1相同 , 再按照字段2进行降序排序
select * from 表名 order by 字段1 asc , 字段2 desc;
```

#### 分页查询
*  起始索引从0开始,起始索引 = (查询页码 - 1)* 每页显示记录数。
*  分页查询是数据库的方言,不同的数据库有不同的实现,MySQL中是LIMIT。
*  如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10。
```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
查询第1页员工数据, 每页展示10条记录
select * from 表名 limit 0,10;
select * from 表名 limit 10;
查询第2页员工数据, 每页展示10条记录
select * from 表名 limit 10,10;
```

#### 执行顺序

1. **FROM** 子句： 首先，数据库从指定的表中检索数据。
2. **WHERE** 子句： 数据库应用 WHERE 子句中的条件筛选出满足条件的数据。
3. **GROUP BY** 子句： 如果有 GROUP BY 子句，数据根据指定的列进行分组。
4. **HAVING** 子句： 如果有 HAVING 子句，数据库应用 HAVING 子句中的条件筛选出满足条件的分组。
5. **SELECT** 子句： 数据库从分组的数据中选择指定的列或表达式。
6. **ORDER BY** 子句： 如果有 ORDER BY 子句，数据库根据指定的列对结果进行排序。
7. **LIMIT** 子句： 最后，如果有 LIMIT 子句，数据库根据指定的行数限制结果集的大小。

### DCL (数据控制语言)

DCL英文全称是Data Control Language(数据控制语言)，用来管理数据库用户、控制数据库的访问权限。
**用户数据都放在mysql数据库的user表中,所以对用户的管理其实就是对user表中数据的操作。**

#### 管理用户

```sql
查询用户: 
	SELECT User, Host FROM mysql.user;
创建用户: 'localhost' 表示只允许本地连接, '%' 表示允许来自任何主机的连接。
	CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
修改用户密码:
	ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码' ;
	- mysql_native_password: 使用经典的用户名和密码进行身份验证。这是 MySQL 中最常用的认证插件。
	- caching_sha2_password: 使用 SHA-256 加密的用户名和密码进行身份验证。这是 MySQL 8.0 中默认的身份验证插件。
	- sha256_password: 类似于 caching_sha2_password,无缓存
删除用户:
	DROP USER '用户名'@'主机名' ;
```

#### 权限控制

多个权限之间,使用逗号分隔。授权时, 数据库名和表名可以使用 * 进行通配,代表所有:

- **ALL**：表示所有权限,包括 SELECT、INSERT、UPDATE、DELETE、ALTER、DROP、CREATE 等所有权限。
- **SELECT**：允许用户查询数据。
- **INSERT**：允许用户插入新数据到表中。
- **UPDATE**：允许用户修改表中现有数据。
- **DELETE**：允许用户删除表中的数据。
- **ALTER**：允许用户修改表的结构，如添加、删除列等操作。
- **DROP**：允许用户删除数据库、表或视图。
- **CREATE**：允许用户创建数据库、表或其他对象。

```sql
查询 'heima'@'%' 用户的权限:
	SHOW GRANTS FOR 'heima'@'%';
授予 'heima'@'%' 用户itcast数据库所有表的所有操作权限:
	GRANT ALL ON itcast.* TO 'heima'@'%';
撤销 'heima'@'%' 用户的itcast数据库的所有权限:
	REVOKE ALL ON itcast.* FROM 'heima'@'%';
```

## 函数

函数 是指一段可以直接被另一段程序调用的程序或代码。 也就意味着,这一段程序或代码在MySQL中
已经给我们提供了，我们要做的就是在合适的业务场景调用对应的函数完成对应的业务需求即可。

### 字符串函数

- **CONCAT(S1, S2, ... Sn)**：字符串拼接。将 S1、S2、... Sn 拼接成一个字符串。

- **LOWER(str)**：将字符串 str 全部转为小写。

- **UPPER(str)**：将字符串 str 全部转为大写。

- **LPAD(str, n, pad)**：左填充。用字符串 pad 对 str 的左边进行填充，使其达到长度为 n。

- **RPAD(str, n, pad)**：右填充。用字符串 pad 对 str 的右边进行填充，使其达到长度为 n。

- **TRIM(str)**：去掉字符串 str 头部和尾部的空格。

- **SUBSTRING(str, start, len)**：返回字符串 str 从 start 位置起的长度为 len 的子字符串。

```sql
字符串拼接
select concat('Hello' , ' MySQL');
全部转小写
select lower('Hello');
全部转大写
select upper('Hello');
左填充
select lpad('01', 5, '-');
右填充
select rpad('01', 5, '-');
去除空格
select trim(' Hello MySQL ');
截取子字符串
select substring('Hello MySQL',1,5);
```

### 数值函数

- **CEIL(x)**：向上取整。返回不小于 x 的最小整数。

- **FLOOR(x)**：向下取整。返回不大于 x 的最大整数。

- **MOD(x, y)**：求模。返回 x 除以 y 的余数。

- **RAND()**：返回随机数。返回一个介于 0 和 1 之间的随机数。

- **ROUND(x, y)**：四舍五入。返回参数 x 的四舍五入值，保留 y 位小数。


```sql
向上取整
select ceil(1.1);
向下取整
select floor(1.9);
取模
select mod(7,4);
获取随机数
select rand();
四舍五入
select round(2.344,2);
```

### 日期和时间函数

- **CURDATE()**：返回当前日期。

- **CURTIME()**：返回当前时间。

- **NOW()**：返回当前日期和时间。

- **YEAR(date)**：获取指定日期 date 的年份。

- **MONTH(date)**：获取指定日期 date 的月份。

- **DAY(date)**：获取指定日期 date 的日期。

- **DATE_ADD(date, INTERVAL expr type)**：返回一个日期/时间值加上一个时间间隔 expr 后的时间值。

- **DATEDIFF(date1, date2)**：返回起始日期 date1 和结束日期 date2 之间的天数。

```sql
当前日期
select curdate();
当前时间
select curtime();
当前日期和时间
select now();
当前年、月、日
select YEAR(now());
select MONTH(now());
select DAY(now());
date_add:增加指定的时间间隔
select date_add(now(), INTERVAL 70 YEAR );
获取两个日期相差的天数
select datediff('2021-10-01', '2021-12-01');
查询所有员工的入职天数，并根据入职天数倒序排序。
select name, datediff(curdate(), 入职日期) as 入职天数 from 表名 order by 入职天数 desc;
```

### 条件函数

流程函数也是很常用的一类函数,可以在SQL语句中实现条件筛选,从而提高语句的效率。

如果 value 为 true,则返回 t,否则返回 f。
- **IF(value, t, f)**
如果 value1 不为空，则返回 value1,否则返回 value2。
- **IFNULL(value1, value2)**
如果 val1 为 true,则返回 res1,否则返回 default 默认值。
- **CASE WHEN [val1] THEN [res1] ... ELSE [default] END**
如果expr的值等于val1,返回res1,... 否则返回default默认值
- **CASE [ expr ] WHEN [ val1 ] THEN [res1] ... ELSE [ default ] END**：

查询hyx-table表的姓名和年龄
```sql
select name, age,
       (case address when '上海' then '一线' when '北京' then '一线' else '二线' end) as 地址,
       (case  when age<30 then '小孩' when age < 50 then '中孩' else '大孩' end) as 年龄
from `hyx-table`;
```

## 约束

* 概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。
* 目的：保证数据库中数据的正确、有效性和完整性

### 数据库约束

AUTO_INCREMENT : MySQL 每张表只能有1个自动增长字段,这个自动增长字段即可作为主键,也可以用作非主键使用,但是请注意将自动增长字段当做非主键使用时必须必须为其添加唯一索引,否则系统将会报错。

- **非空约束**：限制该字段的数据不能为 NULL。通常用于确保某个字段在插入或更新时不为空值。关键字:`NOT NULL`。

- **唯一约束**：保证该字段的所有数据都是唯一、不重复的。通常用于确保某个字段的值在整个表中唯一。关键字：`UNIQUE`。

- **主键约束**：主键是一行数据的唯一标识，要求非空且唯一。主键通常是表中的一个或多个字段组合，用于唯一标识表中的每一行数据。关键字：`PRIMARY KEY`。

- **默认约束**：保存数据时，如果未指定该字段的值，则采用默认值。默认约束可以确保在插入数据时，如果未提供值，则自动使用默认值。关键字：`DEFAULT`。

- **检查约束** (8.0.16版本之后):保证字段值满足某一个条件。检查约束用于确保数据的有效性，如果字段值不满足指定的条件，则不允许插入或更新数据。关键字：`CHECK`。

- **外键约束**：用来让两张表的数据之间建立连接，保证数据的一致性和完整性。外键约束通常用于在两个表之间建立关联关系，确保引用表中的外键值必须是被引用表中

```sql
CREATE TABLE tb_user(
	id int AUTO_INCREMENT PRIMARY KEY COMMENT 'ID唯一标识',
	name varchar(10) NOT NULL UNIQUE COMMENT '姓名' ,
	age int check (age > 0 && age <= 120) COMMENT '年龄' ,
	status char(1) default '1' COMMENT '状态',
	gender char(1) COMMENT '性别'
)
```

###  外键约束

外键：用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性

```sql

创建表时添加外键
CREATE TABLE 表名(
	字段名 数据类型,
	CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名)
);

为已有表添加外键
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名) REFERENCES 主表 (主表列名) ;

为emp表的dept_id字段添加外键约束,关联dept表的主键id
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
dept(id);

删除外键
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;

删除emp表的外键fk_emp_dept_id。
alter table emp drop foreign key fk_emp_dept_id;
```

####  删除/更新行为

- **NO ACTION** 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不
允许删除/更新。 (与 RESTRICT 一致) 默认行为

- **RESTRICT** 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不
允许删除/更新。 (与 NO ACTION 一致) 默认行为

- **CASCADE** 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则
也删除/更新外键在子表中的记录。

- **SET NULL** 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表
中该外键值为null(这就要求该外键允许取null)。

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES
主表名 (主表字段名) ON UPDATE CASCADE ON DELETE CASCADE;

CASCADE
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
dept(id) on update cascade on delete cascade ;
```

##  多表查询

- 连接查询会根据连接条件将两个表中符合条件的行合并起来,然后从合并后的结果集中选择需要的字段。
### 多表关系

项目开发中，在进行数据库表结构设计时，会根据业务需求及业务模块之间的关系，分析并设计表结
构，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：
- 一对多(多对一) :在多的一方建立外键，指向一的一方的主键
- 多对多: 建立第三张中间表，中间表至少包含两个外键，分别关联两方主键
- 一对一 : 在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(UNIQUE)

```sql
查到的是表1所有的记录与表2所有记录的所有组合情况。
select * from 表1 , 表2
给多表查询加上连接查询的条件用来消除无效的数据
select * from 表1 , 表2 where 表1.dept_id = 表2.id;
```
#### 查询
- 连接查询 :查询到的为笛卡尔积
	- 内连接:相当于查询A、B交集部分数据
	- 外连接：
		- 左外连接：查询左表所有数据，以及两张表交集部分数据
		- 右外连接：查询右表所有数据，以及两张表交集部分数据
	- 自连接：当前表与自身的连接查询，自连接必须使用表别名

- 子查询: SQL语句中嵌套SELECT语句,称为嵌套查询,又称子查询。

- 联合查询: 将所有表查到的数据合并起来,形成一个新的查询结果集。字段必须要一致。

内连接的语法分为两种: 隐式内连接、显式内连接。
```sql
隐式内连接:
SELECT 字段列表 FROM 表1 , 表2 WHERE 条件 ... ;
显式内连接:
SELECT 字段列表 FROM 表1 JOIN 表2 ON 连接条件 ... ;
左外连接: 左外连接相当于查询表1的所有数据,也包含表1和表2交集部分的数据。
SELECT 字段列表 FROM 表1 LEFT  JOIN 表2 ON 条件 ... ;
右外连接: 右外连接相当于查询表2的所有数据,也包含表1和表2交集部分的数据。
SELECT 字段列表 FROM 表1 RIGHT  JOIN 表2 ON 条件 ... ;
自连接查询:
SELECT 字段列表 FROM 表A 别名A , 表A 别名B WHERE 条件 ... ;
SELECT 字段列表 FROM 表1 别名A LEFT JOIN 表2 别名B ON 条件 ... ;
联合查询: 带ALL不会对结果去重,不带则相反;所有字段相同视为重复数据
SELECT 字段列表 FROM 表A ... UNION [ ALL ] SELECT 字段列表 FROM 表B ....;
子查询: 子查询外部的语句可以是INSERT / UPDATE / DELETE / SELECT 的任何一个。
SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2 );
```
