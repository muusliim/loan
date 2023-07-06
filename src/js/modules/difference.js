export default class Difference {
    constructor(oldOficcer, newOfficer, items) {
        this.oldOficcer = document.querySelector(oldOficcer);
        this.newOfficer = document.querySelector(newOfficer);
        this.oldItems = this.oldOficcer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);

        this.oldCounter = 0;
        this.newCounter = 0;
    }

    hideitems(items) {
        items.forEach((item, i, arr) => {
            if (i != arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    bingTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('animated', 'fadeInDown');

                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].classList.add('animated', 'fadeOutDown');
            }
        })
    }
    

    init() {
        this.hideitems(this.newItems);
        this.hideitems(this.oldItems);
        this.bingTriggers(this.oldOficcer, this.oldItems, this.oldCounter);
        this.bingTriggers(this.newOfficer, this.newItems, this.newCounter);
    }
}
