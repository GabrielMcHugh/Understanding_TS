"use strict";
function Autobind(value, context) {
    const { kind, name, addInitializer } = context;
    addInitializer(function () {
        this[name] = this[name].bind(this);
    });
}
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputEl = this.element.querySelector('#title');
        this.descriptionInputEl = this.element.querySelector('#description');
        this.peopleInputEl = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    // @Autobind
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputEl.value);
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }
    attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }
}
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map