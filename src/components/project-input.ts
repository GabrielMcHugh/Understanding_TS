/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project.ts" />

namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        titleInputEl: HTMLInputElement;
        descriptionInputEl: HTMLInputElement;
        peopleInputEl: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input')

            this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement
            this.descriptionInputEl = this.element.querySelector('#description') as HTMLInputElement
            this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement

            this.configure()
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

        configure() {
            this.element.addEventListener('submit', this.submitHandler)
        }

        renderContent(): void { }

        @Autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput()
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput
                projectState.addProject(title, desc, people);
                this.clearInputs()
            }
        }

        private clearInputs() {
            this.titleInputEl.value = ''
            this.descriptionInputEl.value = ''
            this.peopleInputEl.value = ''
        }
    }
}