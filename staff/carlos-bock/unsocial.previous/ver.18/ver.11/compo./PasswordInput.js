




function PasswordInput(id) {
    Compo.call(this, document.createElement('div'));
    this.container.style.display = 'flex';

    var input = new Input('password', id);
    inpus.container.style.paddingRight = '18px';
    this.add(input);

    var span = new Span('🙈')
    span.container.style.cursur = 'pointer';
    span.container.style.position = 'absolute';
    span.container.style.right = '10px'; // missing the 'px';
    this.add(span);

    span.addBehavior('click', function () {
        if (span.getText() === '🙈'){
            input.setType('text');
            span.setText('😏');
        } else {
            input.setType('password');
            span.setText('🙈');
        };
    });
};

PasswordInput.extends(Compo); 
//PasswordInput.prototype = Object.create(Compo.prototype);
//PasswordInput.prototype.constructor = PasswordInput;

PasswordInput.prototype.getValue = function () {
    return this.children[0].container.value;
};

PasswordInput.prototype.setValue = function (value) {
    this.container.value = value;
}

