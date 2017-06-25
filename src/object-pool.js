class ObjectPool {
  constructor() {
    this.pools = {};

    this.logCount = 0;

    window.Pool = this.pools;
  }
  new(objectType, objectClass, arg) {
    const pool = this.getPool(objectType);

    // remove from pool
    if (pool.length === 0) {
      return new objectClass(arg);
    } else {
      const object = pool.pop();
      // if (object.objectType === 'pine-cone') console.log(object.placed);

      object.reset(arg.x, arg.y);

      // call object's reset method if it has one
      if (object.resetObject) object.resetObject();

      return object;
    }
  }
  remove(object) {
    const pool = this.getPool(object.objectType);

    // add to pool
    pool.push(object);
  }

  getPool(objectType) {
    if (!this.pools.hasOwnProperty(objectType)) {
      // pool doesn't exist; create it
      this.pools[objectType] = [];
    }

    return this.pools[objectType];
  }

  // cleanUp() {
  //   if (this.pool.length > this.potentialWorkers) {
  //     // there are more workers than there are objects that have registered as needing a worker
  //     // remove non-busy workers until these two numbers match up
  //     // if there aren't enough non-busy workers to remove, they'll probably be removed at next clean up
  //
  //     for (let i = this.pool.length - 1; i >= 0 && this.pool.length > this.potentialWorkers; i--) {
  //       if (this.pool[i].busy) continue;
  //
  //       this.removeWorker(i);
  //     }
  //   }
  //   console.log('currently have', this.pool.length, 'workers');
  // }
}

export default new ObjectPool();
