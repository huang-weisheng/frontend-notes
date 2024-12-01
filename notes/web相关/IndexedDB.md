# IndexedDB

IndexedDB 是一种底层 API,用于在客户端存储大量的结构化数据(也包括文件/二进制大型对象(blobs))。

## 基本概念

- **数据库（Database）**：每个域名可以创建多个数据库
- **数据库模式（Database Schema）**：数据库的对象存储（object store）以及存储结构
- **对象存储（Object Store）**：数据库的子分类,以键值对的形式存储数据
- **对象存储接口（Object Store Interface）**：用于操作对象存储的接口
- **索引（Index）**：用于快速查找数据的辅助结构
- **事务（Transaction）**：确保数据库操作的原子性,一个事务中的操作要么全部成功,要么全部失败
- **游标（Cursor）**：用于遍历数据的机制

## 操作数据库

```js
/**
 * 打开一个数据库,如果数据库不存在则创建该数据库
 * @param {string} name 要连接或创建的数据库名称,创建时触发 onupgradeneeded 事件
 * @param {number} version (可选) 数据库的版本,升级版本时触发 onupgradeneeded 事件
 */
const requestOpenDB = indexedDB.open( name [,version]);

/**
 * 删除一个数据库
 * @param {string} name 要删除的数据库名称
 */
const requestDeleteDB = indexedDB.deleteDatabase(name);
// 利用冒泡机制捕获数据库使用过程中发生的错误
db.onerror = (event) => {
	console.error(`数据库错误：${event.target.errorCode}`);
};
// 捕获数据库被占用的情况
requestOpenDB.addEventListener("blocked", () => {
	console.error("数据库被占用");
});
// 当数据库版本发生变化或数据库创建时触发
// 如果 onupgradeneeded 事件成功执行完成，打开数据库请求的 onsuccess 处理器会被触发。
requestOpenDB.onupgradeneeded = (event) => {
	// 保存数据库实例以供后续操作使用
	db = event.target.result;
};
// 当数据库创建成功时触发
requestOpenDB.onsuccess = (event) => {
	// 保存数据库实例以供后续操作使用
	db = event.target.result;
};	
```

## 创建对象存储

1. 创建对象存储,只能在upgradeneeded 事件中操作
2. createObjectStore 方法用于创建对象存储,会自动创建一个"版本变更"事务并返回对象存储接口
3. 当一个值被存入对象存储时，它会与一个键相关联。键的提供可以有几种不同的方法:
```javascript
requestOpenDB.onupgradeneeded = (event) => {
	const db = event.target.result;
	// 创建对象存储（objectStore）不使用键路径和键生成器
	const objectStoreInterface1 = db.createObjectStore("users1");
	// 可以保存任意类型的值。但必须额外单独提供一个键参数。
	objectStoreInterface1.add({ id: 1, name: 'Alice',age:18 },'a');
	// 创建对象存储（objectStore）使用键路径
	const objectStoreInterface2 = db.createObjectStore("users2",{keyPath: "id"});
	//只能保存 JavaScript 对象。这些对象必须具有一个和键路径同名的属性。
	objectStoreInterface2.add({ id: 1, name: 'Alice',age:18});
	// 创建对象存储（objectStore）使用键生成器(自增)
	const objectStoreInterface3 = db.createObjectStore("users3",{autoIncrement: true});
	// 可以保存任意类型的值。键会自动生成，也可以提供一个单独的键参数作为特定键。
	objectStoreInterface3.add({id:1, name: 'Alice',age:18});
	// 创建对象存储（objectStore）使用键路径和键生成器(自增)
	const objectStoreInterface4 = db.createObjectStore("users4",{keyPath: "id",autoIncrement: true});
	// 只能保存 JavaScript 对象。生成的键的值会被存储在对象中的一个和键路径同名的属性中。
	// 如果已存在该属性，该属性的值将被用作键而不会生成一个新的键。
	objectStoreInterface4.add({ name: 'Alice',age:18});	
};
```

## 删除对象存储

1. 删除对象存储只能在upgradeneeded 事件中操作
```js
requestOpenDB.onupgradeneeded = (event) => {
	const db = event.target.result;
	if(db.objectStoreNames.contains(name)){
		// 删除对象存储 name: 对象存储名称
		db.deleteObjectStore(name);
	}
};
```

## 创建事务

1. 事务来自于数据库对象,可以在该事务内执行多次对数据库的读写操作。
2. 如果事务中的某个操作失败或者事务取消,事务中所有操作将被回滚。
3. 必须指定你想让这个事务跨越哪些对象存储。
4. 事务模式:
	- `readonly`：只读模式，可以并发执行
	- `readwrite`：读写模式，不能并发执行
	- `versionchange`：数据库结构变更模式，自动应用于 `onupgradeneeded` 事件,不能手动指定

```js
// 创建一个事务,第一个参数是作用域,第二个参数是模式,readwrite 读写, readonly 只读
const transaction = db.transaction(["users1","users2"], "readwrite");
// 事务执行完毕后的处理
transaction.oncomplete = (event) => {
  console.log("事务执行完毕！");
};
// 事务执行失败后的处理
transaction.onerror = (event) => {
  console.log("事务执行失败！");
};
// 手动回滚事务,该事务所有操作都会被撤销
transaction.abort();
```

## 操作对象存储中的数据

1. 从事务中获取对象存储接口。
2. 使用对象存储接口对对象存储进行更改或从中读取数据。

```js
// 在事务中获取 users1 的对象存储接口,用来对对象存储中的数据进行操作
const objectStoreInterface = transaction.objectStore("users1");
// 向 users1 的对象存储中添加一条数据
const requestAdd = objectStoreInterface.add({ name: 'Hyx',age:18 });
requestAdd.onsuccess = (event) => {
  // event.target.result === 被添加的数据的键;
};
// 从 users1 的对象存储中删除一条数据,key 是对象存储中数据的键
const requestDelete = objectStoreInterface.delete(key);
requestDelete.onsuccess = (event) => {/*...*/};
// 更新 users1 的对象存储中的数据
// 如果数据中没有键路径的字段,则需要额外提供键(key)来确定更新哪条数据。
const requestPut = objectStoreInterface.put({ name: 'Alice' },key);
requestPut.onsuccess = (event) => {/*...*/};
// 清空 users1 的对象存储中的所有数据
const requestClear = objectStoreInterface.clear();
requestClear.onsuccess = (event) => {/*...*/};
```

## 获取存储对象中的数据

1. 这些方法可以用于事务中的对象存储接口,也可以用于索引
2. 获取多条数据或使用游标遍历时: 对象存储接口按照主键排序,索引按照索引键排序

```js
// 查询一个对象存储中指定主键或索引键为 key 的数据
//在使用索引查询时可能多条数据有相同的 key,获取键值最小的那个
objectStoreInterface.get(key).onsuccess = (event) => {
	console.log(event.target.result);
};
// 查询一个对象存储中指定主键或索引键为 key 的所有数据,不传则获取所有数据
objectStoreInterface.getAll(key?).onsuccess = (event) => {
	console.log(event.target.result);
};
// 查询一个对象存储中指定主键或索引键为 key 的主键值
objectStoreInterface.getKey(key).onsuccess = (event) => {
	console.log(event.target.result);
};
// 查询对象存储中指定主键或索引键为 key 的所有主键值
objectStoreInterface.getAllKeys(key?).onsuccess = (event) => {
	console.log(event.target.result);
};
// 使用游标遍历对象存储中的数据
objectStoreInterface.openCursor().onsuccess = (event) => {
	//拿到当前项
  const cursor = event.target.result;
  if (cursor) {
    console.log(`键 ${cursor.key} 对应的值是:`, cursor.value);
	// 调用 continue 方法得到下一项
    cursor.continue();
  } else {
    console.log("没有更多记录了！");
  }
};
// 使用键游标来获取存储对象接口的键
objectStoreInterface.openKeyCursor().onsuccess = (event) => {
  const cursor = event.target.result;
  if (cursor) {
    // cursor.key 索引值,cursor.primaryKey 主键
    console.log(`索引值：${cursor.key}，主键：${cursor.primaryKey}`);
    cursor.continue();
  }
};
```
- getAll 方法：
	- 适用于小数据集。
	- 使用简单,快速获取所有数据。
	- 不适合处理大数据集,因为会消耗大量内存。

- 游标(cursor):
	- 适用于大数据集。
	- 更灵活,逐条处理数据。
	- 适合需要对每条记录进行操作的场景。
	- 对于处理大量数据更加高效,避免内存溢出。

## 指定游标的范围和方向

1. 如果你想要限定你在游标中看到的值的范围，你可以使用 IDBKeyRange 对象，然后把它作为第一个参数传给 openCursor() 或 openKeyCursor()。

```js
// 仅匹配“Donna”
const singleKeyRange = IDBKeyRange.only("Donna");
// 匹配所有大于“Bill”的， 第二个参数表示是否排除 Bill
const lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill",true);
// 匹配所有小于“Donna”的， 第二个参数表示是否排除 Donna
const upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);
// 匹配所有在“Bill”和“Donna”之间的， 第三个参数表示是否排除 Bill，第四个参数表示是否排除 Donna
const boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);
// 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor() 的第一个参数
objectStoreInterface.openCursor(boundKeyRange).onsuccess = (event) => {
	const cursor = event.target.result;
	if (cursor) {
		// 对匹配结果进行一些操作。
		cursor.continue();
	}
};
```

2. 有时候你可能想要以降序而不是升序来迭代。或者遍历索引时遇到重复键时是否跳过它们。

```js
// prev 降序,next 升序,nextunique,prevunique 跳过重复的键
const direction = "prev";
// 使用键范围,null 表示不使用键范围
objectStoreInterface.openCursor(null,direction).onsuccess = (event) => {
	// ...
};
```

## 索引

1. 通过索引,可以快速查找具有特定属性值的记录,而无需遍历整个对象存储。
2. 索引允许按非主键属性排序和检索数据。
3. 可以使用索引进行范围查询,从而检索属性值在某个范围内的所有记录。
4. 索引具有对存储的数据执行简单约束的能力。通过在创建索引时设置 unique 标志，可以确保不会有两个具有相同索引键路径值的对象被储存。

### 操作索引

1. 索引的创建和删除只能在upgradeneeded 事件中通过对象存储接口操作

```js
requestOpenDB.onupgradeneeded = (event) => {	
	const db = event.target.result;
	const objectStoreInterface = db.createObjectStore("users");
	// 第一个参数是索引名称,第二个参数是索引字段,第三个参数是索引配置对象,unique 表示是否唯一
	objectStoreInterface.createIndex("userName", "name", { unique: false });
	// 删除索引
	objectStoreInterface.deleteIndex("userName");	
};
```

### 使用索引

参考[获取存储对象中的数据](#获取存储对象中的数据)
