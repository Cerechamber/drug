import sliders from './slider/sliders'
import VideoPlayer from './modal/playVideo';
import modals from './modal/modals'

modals();
sliders('.prod-about__slide', 'horizontal', '.prod-about__button_prev', '.prod-about__button_next', false, false, true);
sliders('.production__slide', 'horizontal', '.production__button_prev', '.production__button_next', true);
sliders('.specialists__slide', 'horizontal', false, false, false, true, true);

new VideoPlayer('.play', '.overlay').init();

