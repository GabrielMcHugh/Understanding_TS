"use strict";
/// <reference path="drag-drop-interfaces.ts" />
/// <reference path="project-model.ts" />
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
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if ((project === null || project === void 0 ? void 0 : project.status) !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    const projectState = ProjectState.getInstance();
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
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
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
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateEl = document.getElementById(templateId);
            this.hostEl = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateEl.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    let ProjectItem = (() => {
        var _a;
        let _instanceExtraInitializers = [];
        let _dragStartHandler_decorators;
        return _a = class ProjectItem extends Component {
                get persons() {
                    if (this.project.people === 1) {
                        return '1 person';
                    }
                    else {
                        return `${this.project.people} persons`;
                    }
                }
                constructor(hostId, project) {
                    super('single-project', hostId, false, project.id);
                    this.project = (__runInitializers(this, _instanceExtraInitializers), void 0);
                    this.project = project;
                    this.configure();
                    this.renderContent();
                }
                dragStartHandler(event) {
                    event.dataTransfer.setData('text/plain', this.project.id);
                    event.dataTransfer.effectAllowed = 'move';
                }
                dragEndHandler(event) {
                    console.log('DragEnd');
                }
                configure() {
                    this.element.addEventListener('dragstart', this.dragStartHandler);
                    this.element.addEventListener('dragend', this.dragEndHandler);
                }
                renderContent() {
                    this.element.querySelector('h2').textContent = this.project.title;
                    this.element.querySelector('h3').textContent = this.persons + ' assigned';
                    this.element.querySelector('p').textContent = this.project.description;
                }
            },
            (() => {
                _dragStartHandler_decorators = [Autobind];
                __esDecorate(_a, null, _dragStartHandler_decorators, { kind: "method", name: "dragStartHandler", static: false, private: false, access: { has: obj => "dragStartHandler" in obj, get: obj => obj.dragStartHandler } }, null, _instanceExtraInitializers);
            })(),
            _a;
    })();
    let ProjectList = (() => {
        var _a;
        let _instanceExtraInitializers_1 = [];
        let _dragOverHandler_decorators;
        let _dropHandler_decorators;
        let _dragLeaveHandler_decorators;
        return _a = class ProjectList extends Component {
                constructor(type) {
                    super('project-list', 'app', false, `${type}-projects`);
                    this.type = (__runInitializers(this, _instanceExtraInitializers_1), type);
                    this.assignedProjects = [];
                    this.configure();
                    this.renderContent();
                }
                dragOverHandler(event) {
                    var _a;
                    if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
                        event.preventDefault();
                        const listEl = this.element.querySelector('ul');
                        listEl.classList.add('droppable');
                    }
                }
                dropHandler(event) {
                    const prjId = event.dataTransfer.getData('text/plain');
                    projectState.moveProject(prjId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
                }
                dragLeaveHandler(event) {
                    const listEl = this.element.querySelector('ul');
                    listEl.classList.remove('droppable');
                }
                configure() {
                    this.element.addEventListener('dragover', this.dragOverHandler);
                    this.element.addEventListener('drop', this.dropHandler);
                    this.element.addEventListener('dragleave', this.dragLeaveHandler);
                    projectState.addListener((projects) => {
                        const relevantProjects = projects.filter(prj => {
                            if (this.type === 'active') {
                                return prj.status === App.ProjectStatus.Active;
                            }
                            return prj.status === App.ProjectStatus.Finished;
                        });
                        this.assignedProjects = relevantProjects;
                        this.renderProjects();
                    });
                }
                renderContent() {
                    const listId = `${this.type}-project-lists`;
                    this.element.querySelector('ul').id = listId;
                    this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS ';
                }
                renderProjects() {
                    const listEl = document.getElementById(`${this.type}-project-lists`);
                    listEl.innerHTML = '';
                    for (const prjItem of this.assignedProjects) {
                        new ProjectItem(this.element.querySelector("ul").id, prjItem);
                    }
                }
            },
            (() => {
                _dragOverHandler_decorators = [Autobind];
                _dropHandler_decorators = [Autobind];
                _dragLeaveHandler_decorators = [Autobind];
                __esDecorate(_a, null, _dragOverHandler_decorators, { kind: "method", name: "dragOverHandler", static: false, private: false, access: { has: obj => "dragOverHandler" in obj, get: obj => obj.dragOverHandler } }, null, _instanceExtraInitializers_1);
                __esDecorate(_a, null, _dropHandler_decorators, { kind: "method", name: "dropHandler", static: false, private: false, access: { has: obj => "dropHandler" in obj, get: obj => obj.dropHandler } }, null, _instanceExtraInitializers_1);
                __esDecorate(_a, null, _dragLeaveHandler_decorators, { kind: "method", name: "dragLeaveHandler", static: false, private: false, access: { has: obj => "dragLeaveHandler" in obj, get: obj => obj.dragLeaveHandler } }, null, _instanceExtraInitializers_1);
            })(),
            _a;
    })();
    let ProjectInput = (() => {
        var _a;
        let _instanceExtraInitializers_2 = [];
        let _submitHandler_decorators;
        return _a = class ProjectInput extends Component {
                constructor() {
                    super('project-input', 'app', true, 'user-input');
                    this.titleInputEl = (__runInitializers(this, _instanceExtraInitializers_2), void 0);
                    this.titleInputEl = this.element.querySelector('#title');
                    this.descriptionInputEl = this.element.querySelector('#description');
                    this.peopleInputEl = this.element.querySelector('#people');
                    this.configure();
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
                configure() {
                    this.element.addEventListener('submit', this.submitHandler);
                }
                renderContent() { }
                submitHandler(event) {
                    event.preventDefault();
                    const userInput = this.gatherUserInput();
                    if (Array.isArray(userInput)) {
                        const [title, desc, people] = userInput;
                        projectState.addProject(title, desc, people);
                        this.clearInputs();
                    }
                }
                clearInputs() {
                    this.titleInputEl.value = '';
                    this.descriptionInputEl.value = '';
                    this.peopleInputEl.value = '';
                }
            },
            (() => {
                _submitHandler_decorators = [Autobind];
                __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: obj => "submitHandler" in obj, get: obj => obj.submitHandler } }, null, _instanceExtraInitializers_2);
            })(),
            _a;
    })();
    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
})(App || (App = {}));
//# sourceMappingURL=app.js.map