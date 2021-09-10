const sliders = (slides, dir, prev, next, place=false, pag=false, auto = false) => {
   let slideIndex = 1,
       paused = false,
       showPrev = '',
       img,
       pic,
       pags;

   const items = document.querySelectorAll(slides);

   if (pag) {
       const ul = document.querySelector('.specialists__pag');
       ul.style.display = 'flex';
       for (let p = 0; p < items.length; p++) {
           let li = document.createElement('li');
           li.classList.add('specialists__pag-item');
           li.setAttribute('data-num', p);
           if (p == 0) {
               li.classList.add('specialists__pag-item_active');
           }
           ul.appendChild(li);
       }
        pags = document.querySelectorAll('.specialists__pag li');
       pags.forEach(pag => {
          pag.addEventListener('click', function() {
            const n = this.getAttribute('data-num');
              items.forEach(item => {
                  item.classList.add('animated');
                  item.style.display = 'none';
              });
              items[n].style.display = 'block';
              items[n].classList.remove('slideInRight');
              items[n].classList.add('slideInLeft');
              switchPags(n);
              slideIndex = +n;
          });
       });
   }

   function switchPags(num) {
       pags.forEach(pag => {
          pag.classList.remove('specialists__pag-item_active');
       });
       pags[num].classList.add('specialists__pag-item_active');
   }

    function showSlides(n) {
    	if (n > items.length) {
    		slideIndex = 1;
    	}

    	 if (n < 1) {
          slideIndex = items.length;
    	}
        if (pag) {
            switchPags(slideIndex - 1);
        }
    	items.forEach(item => {
          item.classList.add('animated');
          item.style.display = 'none';
    	});

    	items[slideIndex - 1].style.display = 'block';
        if (place) {
            const ell = document.querySelector('.production__pic');
            showPrev = items[slideIndex - 1].previousElementSibling;
            if (!showPrev) {
                showPrev = items[items.length - 1];
            }
            img = showPrev.querySelector('img')
            pic = img.getAttribute('src');
            ell.setAttribute('src', pic)
        }
    }

    showSlides(slideIndex);

    function plusSlides(n){
    	showSlides(slideIndex += n);
    }

    try {
    	const prevBtn = document.querySelector(prev),
               nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', () => {
          plusSlides(-1);
          items[slideIndex - 1].classList.remove('slideInLeft');
          items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
          plusSlides(1);
          items[slideIndex - 1].classList.remove('slideInRight');
          items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch(e) {}

    function activateAnimation() {
       if (dir === 'vertical') {
       paused = setInterval(function(){
         plusSlides(1);
         items[slideIndex - 1].classList.add('slideInDown');
       },3000);
    } else {
      paused = setInterval(function(){
         plusSlides(1);
         items[slideIndex - 1].classList.remove('slideInRight');
         items[slideIndex - 1].classList.add('slideInLeft');
       },3000);
    }
    }
   if (auto) {
       activateAnimation();

       items[0].parentNode.addEventListener('mouseenter', () => {
           clearInterval(paused);
       });
       items[0].parentNode.addEventListener('mouseleave', () => {
           activateAnimation();
       });
   }




}

export default sliders;
