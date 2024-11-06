




class PasswordInput extends Compo {
    constructor(id) {
        super(document.createElement('div'));
        this.container.style.display = 'flex';

        const input = new Input('password', id);
        inpus.container.style.paddingRight = '18px';
        this.add(input);
    
        const span = new Span('🙈')
        span.container.style.cursur = 'pointer';
        span.container.style.position = 'absolute';
        span.container.style.right = '10px'; 
        this.add(span);
    
        span.addBehavior('click', () => {
            if (span.getText() === '🙈'){
                input.setType('text');
                span.setText('😏');
            } else {
                input.setType('password');
                span.setText('🙈');
            };
        });
    }

    getValue() {
        return this.children[0].container.value;
    }

    setValue(value) {
        this.container.value = value;
    }
};

