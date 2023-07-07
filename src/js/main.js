import Difference from './modules/difference';
import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import videoPlayer from './modules/videoPlayer';
import Forms from './modules/forms';


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const slider = new MainSlider({container: '.page', btns: '.next'});
    slider.render();

    const modulePageSlider = new MainSlider({container:'.moduleapp', btns:'.next', modulePrevBtn:'.prevmodule', moduleNextBtn:'.nextmodule',});
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: false,
        animate: true,
        autoplay: true
    });
    modulesSlider.init();
    
    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active',
        animate: false    
    });
    feedSlider.init();
    
    
    const player = new videoPlayer('.showup .play', '.overlay');
    player.init();

    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    
    new Forms('.form').init();
});