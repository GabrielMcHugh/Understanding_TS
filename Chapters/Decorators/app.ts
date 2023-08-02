//Validation with decorators

interface ValidatorConfig {
    //Index type: multiple properties
    [property: string]: {
        [validateableProp: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {}

function Required<This extends {}, Value>(_: undefined, context: ClassFieldDecoratorContext<This, Value>) {
    let className: string;
    context.addInitializer(function () {
        className = this.constructor.name

        registeredValidators[className] = {
            ...registeredValidators[className],
            [context.name]: ['required']
        }
    })
}


function PositiveNumber<This extends {}, Value>(_: undefined, context: ClassFieldDecoratorContext<This, Value>) {
    let className: string;
    context.addInitializer(function () {
        className = this.constructor.name

        registeredValidators[className] = {
            ...registeredValidators[className],
            [context.name]: ['positive']
        }
    })
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid
}

class Course {
    @Required
    title: string;
    @PositiveNumber 
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }

}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price)

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again')
        return;
    }

    console.log(createdCourse)
})
