const slider = document.querySelector('.slider-container'),
  slides = document.querySelectorAll('.slide');

let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  // Touch events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd); // Mouse leave the window
  slide.addEventListener('mousemove', touchMove);
});

// This is to stop right click on mouse to bring up menu.
// and stop touching for too long on mobile screen which will bring up menu.
// Disable context menu.
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    console.log('start');
    isDragging = true;
  };
}

function touchEnd() {
  console.log('end');
  isDragging = false;
}

function touchMove() {
  if (isDragging) {
    console.log('move');
  }
}
