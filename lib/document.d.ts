interface Document {
  exitFullscreen: any;
  mozCancelFullScreen: any;
  webkitExitFullscreen: any;
  fullscreenElement: any;
  mozFullScreenElement: any;
  webkitFullscreenElement: any;
  msFullscreenElement: any;
  msExitFullscreen: any;
  mozRequestFullScreen: any;
  msRequestFullscreen: any;
  webkitRequestFullscreen: any;
}

interface Document {
  exitFullscreen: () => void;
  mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  fullscreenElement: () => void;
  mozFullScreenElement: () => void;
  webkitFullscreenElement: () => void;
  msRequestFullscreen: () => void;
  webkitRequestFullscreen: () => void;
  mozRequestFullScreen: () => void;
  msExitFullscreen: () => void;
}

interface HTMLElement {
  msRequestFullscreen: any;
  mozRequestFullScreen: any;
  webkitRequestFullscreen: any;
}
