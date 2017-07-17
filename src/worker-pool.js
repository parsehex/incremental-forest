class WorkerPool {
  constructor() {
    this._path = 'web-worker/path-find.js';
    this._pool = [];
    this._potentialWorkers = 0;

    this._logCount = 0;
  }
  addTask(args, callback) {
    const thisWorker = this._getFreeWorker();
    thisWorker.busy = true;

    thisWorker.worker.onmessage = function(event) {
      callback(event.data);

      thisWorker.worker.onmessage = null;
      thisWorker.busy = false;
    };

    thisWorker.worker.postMessage(args);

    this._logCount++;
    if (this._logCount % 10 === 0) this._cleanUp();
  }
  register() {
    this._potentialWorkers++;
  }
  unregister() {
    this._potentialWorkers--;
  }

  _getFreeWorker() {
    for (let i = 0; i < this._pool.length; i++) {
      if (!this._pool[i].busy) return this._pool[i];
    }

    // no free workers; return a new one
    return this._createWorker();
  }
  _createWorker() {
    const newWorker = {
      worker: new Worker(this._path),
      busy: false,
    };
    this._pool.push(newWorker);

    return newWorker;
  }
  _removeWorker(index) {
    this._pool[index].worker.terminate();
    this._pool.splice(index, 1);
  }
  _cleanUp() {
    if (this._pool.length > this._potentialWorkers) {
      // there are more workers than there are objects that have registered as needing a worker
      // remove non-busy workers until these two numbers match up
      // if there aren't enough non-busy workers to remove, they'll probably be removed at next clean up

      for (let i = this._pool.length - 1; i >= 0 && this._pool.length > this._potentialWorkers; i--) {
        if (this._pool[i].busy) continue;

        this._removeWorker(i);
      }
    }
  }
}

export default new WorkerPool();
