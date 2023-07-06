import Slider from "./slider";

export default class MiniSlider extends Slider{
    constructor(obj) {
        super(obj);
    }



    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        if (!Array.from(this.slides)[0].closest('button')){
                Array.from(this.slides)[0].classList.add(this.activeClass);
        }
        if (this.animate) {
            Array.from(this.slides)[0].querySelector('.card__title').style.opacity = '1';
            Array.from(this.slides)[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        Array.from(this.slides).map(slide => {
            if (slide.tagName === 'BUTTON') {
                this.container.append(slide);
            }
        })
        this.container.append(this.slides[0]);
        this.decorizeSlides();
    }

    bindTrigger() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            Array.from(this.slides).map(slide => {
                if (slide.tagName === 'BUTTON') {
                    this.container.prepend(slide);
                }
            })
            this.container.prepend(this.slides[this.slides.length - 1]);
            this.decorizeSlides();
        });
    }

    init() {
        this.container.style.cssText = `
        display: flex; 
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
        `;

        this.bindTrigger();
        this.decorizeSlides();

        if (this.autoplay) {
            setInterval(() => this.nextSlide(), 5000);
        }
    }
}