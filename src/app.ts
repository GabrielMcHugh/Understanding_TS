//Project State Management
class ProjectState {
    private listeners: any[] = []
    private projects: any[] = []
    private static instance: ProjectState;
    
    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState()
    }

    addListener(listenerFn: Function) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance()

//Validation
interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number,
}

function validate(validatableInput: Validatable) {
    let isValid = true
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value > validatableInput.min
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value < validatableInput.max
    }

    return isValid
}

//autobind decorator
function Autobind(_: Function, context: ClassMethodDecoratorContext) {
    const { name, addInitializer } = context

    addInitializer(function () {
        (this as any)[name] = (this as any)[name].bind(this)
    })

}

class ProjectList {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];

    constructor(private type: 'active' | 'finished') {
        this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = `${this.type}-projects`

        projectState?.addListener((projects: any[]) => {
            this.assignedProjects = projects
            this.renderProjects()
        })

        this.attach()
        this.renderContent()
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-lists`)! as HTMLUListElement
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li')
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem)
        }
    }

    private renderContent() {
        const listId = `${this.type}-project-lists`
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS ';
    }

    private attach() {
        this.hostEl.insertAdjacentElement('beforeend', this.element);
    }
}

class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'

        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement

        this.configure()
        this.attach()


    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputEl.value
        const enteredDescription = this.descriptionInputEl.value
        const enteredPeople = this.peopleInputEl.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        }
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!')
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            projectState!.addProject(title, desc, people);
            console.log(title, desc, people)
            this.clearInputs()
        }
    }

    private clearInputs() {
        this.titleInputEl.value = ''
        this.descriptionInputEl.value = ''
        this.peopleInputEl.value = ''
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
    }


}

const prjInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')