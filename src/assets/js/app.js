const Preloader = document.querySelector('.preloader');
const PreloaderAnswer = document.querySelector('.preloader__answer');
const Art = document.querySelectorAll('.art.scene');
const Puzzle = document.querySelectorAll('.puzzle');
const Finish = document.querySelectorAll('.finish');
const Video = document.querySelector('.video-hover');
const GetLink = document.querySelectorAll('.finish-footer__item-link');
const Training = document.querySelector('.training');
const VideoTraining = document.querySelector('.training__video video');
const GetStarted = document.querySelector('.get-started')
const GetStartedSection = document.querySelectorAll('.get-started__section')
let Count = 0;
let GetStartedActive = 0;

GetLink.forEach((item, index) => {
  item.addEventListener('click', () => {
    const data = item.getAttribute('data-section')
    console.log(data)
    Finish[0].classList.add('scroll-down');
    GetStarted.classList.add('scroll-down')
  });
});

Training.addEventListener('click', () => {
  Training.classList.add('start');
  setTimeout(() => {
    VideoTraining.classList.add('show');
    VideoTraining.play();
  }, 7500);
});

const PreloaderTick = setInterval(() => {
  setTimeout(() => {
    PreloaderAnswer.innerHTML = 'No';
  }, 150);
  setTimeout(() => {
    PreloaderAnswer.innerHTML = 'Yes';
  }, 300);
}, 300);

const Scene = () => Art.forEach((e, i) => {
  Art[0].classList.add('start');

  setTimeout(() => {
    Art[i + 1] ? Art[i + 1].classList.add('start') : null;
    Count = Count + 1;

    if (Count === Art.length) {
      Puzzle[0].classList.add('start');

      Count = Count + 1;

      if (Count === Art.length + Puzzle.length) {
        setTimeout(() => {
          Finish[0].classList.add('start');
          setTimeout(() => {
            Finish[0].classList.add('play');
            setTimeout(() => {
              Finish[0].classList.remove('play');
            }, 8000);
          }, 20000);
        }, 16500);
      }
    }
  }, 11500 * (i + 1));
});

setTimeout(() => {
  Preloader.classList.add('hide');
  clearInterval(PreloaderTick);
  setTimeout(() => {
    Scene();
    if (Art[0] === undefined && Puzzle[0] !== undefined) {
      Count = Count + 1;
      Puzzle[0].classList.add('start');
    }
    if (Art[0] === undefined && Puzzle[0] === undefined) {
      Finish[0].classList.add('start');
      setTimeout(() => {
        Finish[0].classList.add('play');
        setTimeout(() => {
          Finish[0].classList.remove('play');
        }, 8000);
      }, 20000);
    }
    if (Art[0] === undefined && Puzzle[0] !== undefined) {
      setTimeout(() => {
        Finish[0].classList.add('start');
      }, 16500);
    }
  }, 600);
}, 2000);

GetLink.forEach(item => {
  item.addEventListener('mouseover', () => {
    Video.classList.add('play');
    Video.play();
    Video.addEventListener('ended', function () {
      Video.currentTime = 3;
    });
    Video.addEventListener('timeupdate', function () {
      if (Video.currentTime >= 8.2) {
        Video.currentTime = 3;
      }
    });
  });
  item.addEventListener('mouseout', () => {
    Video.classList.remove('play');
    Video.pause();
  });
});

