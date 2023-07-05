import Slider from './modules/slider';
import videoPlayer from './modules/videoPlayer';


window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    const slider = new Slider('.page', '.next');
    slider.render();
    
    const player = new videoPlayer('.showup .play', '.overlay');
    player.init();
});