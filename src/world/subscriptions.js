export function _notifySubscribers(x, y, eventType) {
  // call all subscribers with event info

  const len = this._subscribers.length;
  for (let i = 0; i < len; i++) {
    // inform the subscriber of: change coordinate, objects at tile, type of event
    this._subscribers[i][1](x, y, this.tile(x, y), eventType);
  }
}
export function subscribe(id, callback) {
  // register a subscriber to world events

  this._subscribers.push([ id, callback ]);
}
export function unsubscribe(id) {
  // unregister a subscriber by id to world events

  for (let i = 0; i < this._subscribers.length; i++) {
    // first index of subscriber is the sub's id
    if (this._subscribers[i][0] !== id) continue;

    this._subscribers.splice(i, 1);
    break;
  }
}
