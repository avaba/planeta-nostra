const Preloader = document.querySelector('.preloader');
const PreloaderAnswer = document.querySelector('.preloader__answer');
const Art = document.querySelectorAll('.art.scene');
const Puzzle = document.querySelectorAll('.puzzle');
const Finish = document.querySelectorAll('.finish');
const Video = document.querySelector('.finish__video')
let Count = 0;

console.log(Art.length);

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

