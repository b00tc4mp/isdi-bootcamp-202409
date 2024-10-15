


class Image extends Compo{
    constructor(address) {
        super(document.createElement('img'));

        this.container.scr = address;
        this.container.style.width = '100%';
    };
};

