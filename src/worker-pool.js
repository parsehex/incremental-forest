class WorkerPool {
  constructor() {
    this.path = 'web-worker/path-find.js';
    this.pool = [];
    this.potentialWorkers = 0;

    this.logCount = 0;
  }
  addTask(args, callback) {
    const thisWorker = this.getFreeWorker();
    thisWorker.busy = true;

    thisWorker.worker.onmessage = function(event) {
      callback(event.data);

      thisWorker.worker.onmessage = null;
      thisWorker.busy = false;
    };

    thisWorker.worker.postMessage(args);

    this.logCount++;
    if (this.logCount % 10 === 0) this.cleanUp();
  }
  register() {
    this.potentialWorkers++;
  }
  unregister() {
    this.potentialWorkers--;
  }

  getFreeWorker() {
    for (let i = 0; i < this.pool.length; i++) {
      if (!this.pool[i].busy) return this.pool[i];
    }

    // no free workers; return a new one
    return this.createWorker();
  }
  createWorker() {
    const newWorker = {
      worker: new Worker(this.path),
      busy: false,
    };
    this.pool.push(newWorker);

    return newWorker;
  }
  removeWorker(index) {
    this.pool[index].worker.terminate();
    this.pool.splice(index, 1);
  }
  cleanUp() {
    if (this.pool.length > this.potentialWorkers) {
      // there are more workers than there are objects that have registered as needing a worker
      // remove non-busy workers until these two numbers match up
      // if there aren't enough non-busy workers to remove, they'll probably be removed at next clean up

      for (let i = this.pool.length - 1; i >= 0 && this.pool.length > this.potentialWorkers; i--) {
        if (this.pool[i].busy) continue;

        this.removeWorker(i);
      }
    }
    // console.log('currently have', this.pool.length, 'workers');
  }
}

export default new WorkerPool();
