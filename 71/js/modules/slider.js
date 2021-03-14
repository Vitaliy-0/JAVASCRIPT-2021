function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          next = document.querySelector(nextArrow),
          prev = document.querySelector(prevArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1,
        offset = 0;

    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length +'%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.8s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');

        if(i==0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        moveSlide();

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length){
            slideIndex = 1;
        } else{
            slideIndex +=1;
        }

        slideIndexes();

        dots.forEach(dot => {
            dot.style.opacity = '.5';
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    prev.addEventListener('click', () => {
        moveSlide();

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1){
            slideIndex = slides.length;
        } else{
            slideIndex -=1;
        }

        slideIndexes();

        dots.forEach(dot => {
            dot.style.opacity = '.5';
            dots[slideIndex-1].style.opacity = 1;
        });
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            slideIndexes();

            dots.forEach(dot => {
                dot.style.opacity = '.5';
                dots[slideIndex-1].style.opacity = 1;
            });
        });
    });

    function slideIndexes(){
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }else{
            current.textContent = slideIndex;
        }
    }
    function moveSlide(){
        if(offset == deleteNotDigits(width) *(slides.length - 1)){
            offset = 0;
        }else{
            offset += deleteNotDigits(width);
        }
    }
    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }
}

export default slider;