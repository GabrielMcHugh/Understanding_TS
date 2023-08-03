"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.max;
    }
    return isValid;
}
//autobind decorator
function Autobind(_, context) {
    const { name, addInitializer } = context;
    addInitializer(function () {
        this[name] = this[name].bind(this);
    });
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateEl = document.getElementById('project-list');
        this.hostEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-project-lists`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS ';
    }
    attach() {
        this.hostEl.insertAdjacentElement('beforeend', this.element);
    }
}
let ProjectInput = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _submitHandler_decorators;
    return _a = class ProjectInput {
            constructor() {
                this.templateEl = (__runInitializers(this, _instanceExtraInitializers), void 0);
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
            gatherUserInput() {
                const enteredTitle = this.titleInputEl.value;
                const enteredDescription = this.descriptionInputEl.value;
                const enteredPeople = this.peopleInputEl.value;
                const titleValidatable = {
                    value: enteredTitle,
                    required: true
                };
                const descriptionValidatable = {
                    value: enteredDescription,
                    required: true,
                    minLength: 5,
                };
                const peopleValidatable = {
                    value: +enteredPeople,
                    required: true,
                    min: 1,
                    max: 5,
                };
                if (!validate(titleValidatable) ||
                    !validate(descriptionValidatable) ||
                    !validate(peopleValidatable)) {
                    alert('Invalid input, please try again!');
                    return;
                }
                else {
                    return [enteredTitle, enteredDescription, +enteredPeople];
                }
            }
            submitHandler(event) {
                event.preventDefault();
                const userInput = this.gatherUserInput();
                if (Array.isArray(userInput)) {
                    const [title, desc, people] = userInput;
                    console.log(title, desc, people);
                    this.clearInputs();
                }
            }
            clearInputs() {
                this.titleInputEl.value = '';
                this.descriptionInputEl.value = '';
                this.peopleInputEl.value = '';
            }
            configure() {
                this.element.addEventListener('submit', this.submitHandler);
            }
            attach() {
                this.hostEl.insertAdjacentElement('afterbegin', this.element);
            }
        },
        (() => {
            _submitHandler_decorators = [Autobind];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: obj => "submitHandler" in obj, get: obj => obj.submitHandler } }, null, _instanceExtraInitializers);
        })(),
        _a;
})();
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map