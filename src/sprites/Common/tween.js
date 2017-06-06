export default function tweenMove(newProps, time, callback) {
  const move = this.game.add.tween(this);

  move.to(newProps, time, null, true);

  move.onComplete.add(callback, this);
}
