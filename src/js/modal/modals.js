const modals = () => {

	function bindModals(triggerSelector, modalSelector, closeSelector) {

      const trigger = document.querySelectorAll(triggerSelector),
             modal = document.querySelector(modalSelector),
             close = document.querySelector(closeSelector),
             scroll = calcScroll(),
             windows = document.querySelectorAll('[data-modal]');


      trigger.forEach(item =>{
        item.addEventListener('click', (e) => {
      	if (e.target) {
           e.preventDefault();
      	}

        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });

      	modal.style.display = 'block';
      	document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;

      });
      });

        function calcScroll() {
            let div = document.createElement('div');
            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();
            return scrollWidth;
        }

      close.addEventListener('click', () => {
         modal.style.display = 'none';
         document.body.style.overflow = '';
         windows.forEach(item=>{
          item.style.display = 'none';
        });
         document.body.style.marginRight = `0px`;
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
           modal.style.display = 'none';
           document.body.style.overflow = '';
           windows.forEach(item=>{
          item.style.display = 'none';
        });
           document.body.style.marginRight = `0px`;
        }
      });
	}

	bindModals('.header__burger', '.popup', '.popup__close');
}

export default modals;
