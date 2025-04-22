//add documentation here

function Compo(container) {
    this.children = [];
    this.container = container;
}

Compo.prototype.add = function (child) {
    this.children.push(child);
    this.container.appendChild(child.container);
}

Compo.prototype.remove = function () {
    this.container.remove();
}

Compo.prototype.addBehavior = function (type, callback) {
    this.container.addEventListener(type, callback);
}

function Form() {
    Compo.call(this, document.createElement('form'));
}

Form.prototype = Object.create(Compo.prototype);
Form.prototype.constructor = Form;

Form.prototype.reset = function () {
    this.container.reset();
}

function Button(text, type) {
    Compo.call(this, document.createElement('button'));

    this.container.innerText = text;
    this.container.type = type;
}

Button.prototype = Object.create(Compo.prototype);
Button.prototype.constructor = Button;

function Label(text, id) {
    Compo.call(this, document.createElement('label'));

    this.container.innerText = text;
    this.container.htmlFor = id;
}

Label.prototype = Object.create(Compo.prototype);
Label.prototype.constructor = Label;


//add documentation here
function Input(type, id) {
    Compo.call(this, document.createElement('input'))
    this.container.style.width = '100%'; //added style
    this.container.style.boxSizing = 'border-box'; //added style

    this.container.type = type;
    this.container.id = id;
}

Input.prototype = Object.create(Compo.prototype)
Input.prototype.constructor = Input;

Input.prototype.getValue = function() {
    return this.container.value;
}

Input.prototype.setValue = function (value) {
    this.container = value;
}

Input.prototype.getType = function () {
    return this.container.type;
}

Input.prototype.setType = function (type) {
    this.container.type = type; 
}


function Heading(text, level) {
    Compo.call(this, document.createElement('h'+ level))

    this.container.innerText = text;
}

Heading.prototype =  Object.create(Compo.prototype);
Heading.prototype.constructor = Heading;


function Link(text) {
    Compo.call(this, document.createElement('a'));

    this.container.innerText = text;
    this.container.href = '';
}

Link.prototype = Object.create(Compo.prototype);
Link.prototype.constructor = Link;

/////new to version 10 
function Span(text) {
    Compo.call(this, document.createElement('span'));

    this.container.innerText = text;
};

Span.prototype = Object.create(Compo.prototype);
Span.prototype.constructor = Span;

Span.prototype.setText = function (text) {
    this.container.innerText = text;
}

Span.prototype.getText = function () {
    return this.container.innerText;
}

function PasswordInput(id) {
    Compo.call(this, document.createElement('div'));
    this.container.style.display = 'flex';

    var input = new Input('password', id);
    inpus.container.style.paddingRight = '18px';
    this.add(input);

    var span = new Span('🙈')
    span.container.style.cursur = 'pointer';
    span.container.style.position = 'absolute';
    span.container.style.right = '10';
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

PasswordInput.prototype = Object.create(Compo.prototype);
PasswordInput.prototype.constructor = PasswordInput;

PasswordInput.prototype.getValue = function () {
    return this.children[0].container.value;
};


PasswordInput.prototype.setValue = function (value) {
    this.container.value = value;
}

function UnorderedList() {
    Compo.call(this, document.createElement('ul'));
};

UnorderedList.prototype = Object.create(Compo.prototype);
UnorderedList.prototype.constructor = UnorderedList;

function ListItem() {
    Compo.call(this, document.createElement('li'));
};

ListItem.prototype = Object.create(Compo.prototype);
ListItem.prototype.constructor = ListItem;

function Image(address) {
    Compo.call(this,document.createElement('img'));

    this.container.scr = address;
    this.container.style.width = '100%';
}

Image.prototype = Object.create(Compo.prototype);
Image.prototype.constructor = Image;

function Paragraph(text) {
    Compo.call(this, document.createElement('p'));

    this.container.innerText = text;
}

Paragraph.prototype = Object.create(Compo.prototype);
Paragraph.prototype.constructor = Paragraph; 

Paragraph.prototype.setText = function (text) {
    this.container.innerText = text;
};

Paragraph.prototype.getText = function () {
    return this.container.innerText;
};

function Time(text) {
    Compo.call(this, document.createElement('time'));

    this.container.innerText = text;
};

Time.prototype = Object.create(Compo.prototype);
Time.prototype.constructor = Time;

Time.prototype.setText = function (text) {
    this.container.innerText = text;
}

Time.prototype.getText = function () {
    return this.container.innerText;
}