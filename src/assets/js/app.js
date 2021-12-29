import VideoContext from 'videocontext';

const date = new Date(Date.now() + 96400e5).toUTCString();
const VideoContainer = document.querySelector('.video');
const VideoStart = document.querySelector('.video__item');
const VideoAudio = document.querySelector('.video__audio');
const GetLink = document.querySelectorAll('.home-btn .btn.lock');
const VideoHover = document.querySelector('.home__hover');
const Preloader = document.querySelector('.preloader');
const PreloaderAnswer = document.querySelector('.preloader__answer');
const Play = document.querySelector('#play');
const Width = window.innerWidth;
const Height = window.innerHeight;
const VideoSkip = document.querySelector('.video__skip');
const Subscribe = document.querySelector('#subscribe');
const body = document.querySelector('body');
const home = document.querySelector('.home');

function get_cookie (cookie_name) {
  const results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

  if (results)
    return (unescape(results[2]));
  else
    return null;
}

const PreloaderTick = () => {
  setInterval(() => {
    setTimeout(() => {
      PreloaderAnswer.innerHTML = 'No';
    }, 150);
    setTimeout(() => {
      PreloaderAnswer.innerHTML = 'Yes';
    }, 300);
  }, 300);
};

PreloaderTick();

setTimeout(() => {
  Play.disabled = false;
  Play.classList.add('show');
}, 3000);

// if (Width > 1600) {
//   VideoStart.src = '../assets/video/1920_track.mp4';
// } else if (Width <= 1600 && Width >= 1200) {
//   VideoStart.src = '../assets/video/1440_track.mp4';
// } else if (Width <= 1200 && Width >= 1024) {
//   VideoStart.src = '../assets/video/1024_track.mp4';
// } else {
//   VideoStart.src = '../assets/video/1284_track.mp4';
// }


VideoHover.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  e.stopPropagation();
}, false);
if (VideoHover.hasAttribute('controls')) {
  VideoHover.removeAttribute('controls');
}

window.playClick = function () {
  if (get_cookie('visited')) {
    VideoSkip.classList.add('show');
  }
  document.cookie = 'visited=true; expires=' + date;
  Preloader.classList.add('hide');
  Play.classList.add('hide');

  const audio = new Audio();
  audio.autoplay = true;
  audio.src = 'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

  setTimeout(() => {
    const canvas = document.getElementById('canvas');
    let srcVideo = '';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    if (Width > 1600) {
      srcVideo = '../assets/video/1920_track.mp4';
      canvas.width = 1920;
      canvas.height = 1080;
    } else if (Width <= 1600 && Width >= 1200) {
      srcVideo = '../assets/video/1440_track.mp4';
      canvas.width = 1440;
      canvas.height = 900;
    } else if (Width <= 1200 && Width >= 1024) {
      srcVideo = '../assets/video/1024_track.mp4';
      canvas.width = 1024;
      canvas.height = 1366;
    } else {
      srcVideo = '../assets/video/1284_track.mp4';
      canvas.width = 1284;
      canvas.height = 2778;
    }

    const videoCtx = new VideoContext(canvas);
    const videoNode = videoCtx.video(srcVideo, 0, 2, {
      volume: 0
    });
    // videoNode.volume(0);
    // const audioNode = videoCtx.audio('../assets/video/audio.mp3');
    // audioNode.connect(videoCtx.destination);
    // audioNode.start(0);
    videoNode.connect(videoCtx.destination);
    videoNode.start(0);

    //audio context
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // const source= audioCtx.createMediaElementSource(audio);
    // source.connect(audioCtx.destination);
    // audio.play();
    videoCtx.play();
    // VideoAudio.play()
    videoCtx.registerCallback(VideoContext.EVENTS.CONTENT, () => {
      audio.src = './assets/video/audio.mp3';
    });

    videoCtx.registerCallback(VideoContext.EVENTS.ENDED, () => {
      VideoContainer.remove();
      audio.pause();
      if (Width < 1024) {
        body.style.overflow = 'auto';
        body.style.height = 'auto';
        home.style.height = 'auto';
        window.scrollBy(0, 0);
      }
    });

    VideoSkip.addEventListener('click', () => {
      videoCtx.pause();
      audio.pause();
      canvas.remove();
      VideoContainer.remove();
      if (Width < 1024) {
        body.style.overflow = 'auto';
        body.style.height = 'auto';
        home.style.height = 'auto';
        window.scrollBy(0, 0);
      }
    });
  }, 1500);
};

GetLink.forEach(item => {
  item.addEventListener(('click'), (e) => {
    e.preventDefault();
  });
  if (Width > 1024) {
    item.addEventListener('mouseover', () => {
      item.textContent = 'coming soon';
      item.classList.add('white');
      VideoHover.play();
      VideoHover.classList.add('play');
      VideoHover.addEventListener('ended', function () {
        VideoHover.currentTime = 0;
        VideoHover.play();
      });
    });
    item.addEventListener('mouseout', () => {
      item.textContent = 'get started';
      item.classList.remove('white');
      VideoHover.classList.remove('play');
      VideoHover.pause();
    });
  } else {
    item.addEventListener('click', (e) => {
      item.textContent = 'coming soon';
      item.classList.add('white');
      VideoHover.play();
      VideoHover.classList.add('play');
      VideoHover.addEventListener('ended', function () {
        VideoHover.currentTime = 0;
        VideoHover.play();
      });
      setTimeout(() => {
        item.textContent = 'get started';
        item.classList.remove('white');
        VideoHover.classList.remove('play');
        VideoHover.pause();
      }, 3000);
    });
  }
});

const Modal = document.querySelector('.modal');
const ModalClose = document.querySelector('.modal__close');
Subscribe.addEventListener('click', (e) => {
  e.preventDefault();
  Modal.classList.add('show');
});
ModalClose.addEventListener('click', () => {
  Modal.classList.remove('show');
});
