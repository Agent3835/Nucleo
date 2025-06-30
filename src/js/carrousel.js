const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 2;

function updateCarousel(index) {
  const total = slides.length;

  slides.forEach((slide, i) => {
    slide.className = 'carousel-slide';
    const pos = (i - index + total) % total;
    if (pos === 0) {
      slide.classList.add('far-left');
      slide.style.transform = 'translateX(-150px) scale(0.9)';
    } else if (pos === 1) {
      slide.classList.add('prev');
      slide.style.transform = 'translateX(-100px) scale(1)';
    } else if (pos === 2) {
      slide.classList.add('active');
      slide.style.transform = 'translateX(0) scale(1.2)';
    } else if (pos === 3) {
      slide.classList.add('next');
      slide.style.transform = 'translateX(100px) scale(1)';
    } else if (pos === 4) {
      slide.classList.add('far-right');
      slide.style.transform = 'translateX(150px) scale(0.9)';
    } else {
      slide.style.transform = 'translateX(0) scale(0.8)';
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentIndex = index;
}

updateCarousel(currentIndex);

document.getElementById('prevBtn').addEventListener('click', () => {
  updateCarousel((currentIndex - 1 + slides.length) % slides.length);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  updateCarousel((currentIndex + 1) % slides.length);
}
);
document.querySelector('.left-side').addEventListener('click', () => {
   updateCarousel((currentIndex - 1 + slides.length) % slides.length);
});

document.querySelector('.right-side').addEventListener('click', () => {
   updateCarousel((currentIndex + 1) % slides.length);
});

setInterval(() => {
  updateCarousel((currentIndex + 1) % slides.length);
}, 3000); 