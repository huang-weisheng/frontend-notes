/**
 * IndexDB 工具类
 * 提供简单易用的 IndexDB 操作接口
 */
export class IndexDBUtil {
  private database: string;
  private version: number;
  private db: IDBDatabase | null = null;

  constructor(database: string, version: number = 1) {
    this.database = database;
    this.version = version;
  }

  /**
   * 初始化数据库
   * @param stores 存储库配置 { storeName: keyPath }
   */
  async init(stores: Record<string, string>): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.database, this.version);

      request.onerror = () => {
        reject(new Error('数据库打开失败'));
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // 创建存储库
        Object.entries(stores).forEach(([storeName, keyPath]) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath });
          }
        });
      };
    });
  }

  /**
   * 添加数据
   * @param storeName 存储库名称
   * @param data 要添加的数据
   */
  async add<T>(storeName: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('添加数据失败'));
    });
  }

  /**
   * 更新数据
   * @param storeName 存储库名称
   * @param data 要更新的数据
   */
  async update<T>(storeName: string, data: T): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('更新数据失败'));
    });
  }

  /**
   * 删除数据
   * @param storeName 存储库名称
   * @param key 主键值
   */
  async delete(storeName: string, key: string | number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('删除数据失败'));
    });
  }

  /**
   * 查询单条数据
   * @param storeName 存储库名称
   * @param key 主键值
   */
  async get<T>(storeName: string, key: string | number): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('查询数据失败'));
    });
  }

  /**
   * 查询所有数据
   * @param storeName 存储库名称
   */
  async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('查询所有数据失败'));
    });
  }

  /**
   * 清空存储库
   * @param storeName 存储库名称
   */
  async clear(storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('数据库未初始化'));
        return;
      }

      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('清空数据失败'));
    });
  }

  /**
   * 关闭数据库连接
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
