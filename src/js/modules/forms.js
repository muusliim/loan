export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: `Thank you! we'll be in touch soon`,
            failure: 'Oops! something went wrong...'
        }
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        })
    }

    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');
        mailInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \. -\_ +]/ig)) {
                    e.preventDefault();
                }
            });
    
            input.addEventListener('input', () => {
                input.style.cssText = 'border: none';
    
                if (input.value.match(/[^a-z 0-9 @ \. \- + \_]/ig)) {
                    input.style.cssText = 'border: 1px solid red';
                }
            });  
        });
    }


    async postData(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }
 //phone mask
    initMask() {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

//main init method
    init() {
        this.initMask();
        this.checkMailInputs();
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 20px;
                    color: grey;
                    font-size: 18px;
                `;

                item.parentElement.append(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(item);
                
                this.postData(this.path, formData)
                    .then(item => {
                        console.log(item);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => statusMessage.textContent = this.message.failure)
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 3000);
                    })  
            });
        });
    }
}