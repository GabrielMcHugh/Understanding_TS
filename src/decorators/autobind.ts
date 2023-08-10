namespace App {
    //autobind decorator
    export function Autobind(_: Function, context: ClassMethodDecoratorContext) {
        const { name, addInitializer } = context

        addInitializer(function () {
            (this as any)[name] = (this as any)[name].bind(this)
        })

    }

}