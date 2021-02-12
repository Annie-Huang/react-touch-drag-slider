const slider = document.querySelector('.slider-container'),
  slides = document.querySelectorAll('.slide');

let isDragging = false,
  startPos = 0,
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
    console.log("event.type.includes('mouse')=", event.type.includes('mouse'));
    currentIndex = index;
    startPos = getPositionX(event);
    console.log('startPos=', startPos);
    isDragging = true;

    // https://css-tricks.com/using-requestanimationframe/
    animationID = requestAnimationFrame(animation);

    slider.classList.add('grabbing');
  };
}

function touchEnd() {
  console.log('end');
  isDragging = false;
  cancelAnimationFrame(animationID); // Stop the animation once the mouse is release.

  slider.classList.remove('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    console.log('move');
    const currentPosition = getPositionX(event);
    // You can see if you press down the mouse and move left and right, the image will move with you.
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();

  // Calling itself recusively??
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}
