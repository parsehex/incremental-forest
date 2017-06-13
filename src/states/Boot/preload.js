export default function preload() {
  // console.log('Boot preload');

  if (!window.Worker) {
    // warn that web workers not supported
  }

  this.load.image('loaderBg', 'assets/images/loader-bg.png')
  this.load.image('loaderBar', 'assets/images/loader-bar.png')
}
