react-bicon
==================
A data-binding library for react

example
-------

```
var react = require("react");
var {Context,Binding} = require("react-bind-context");
var TextField = require("./my_textfield_component");

class App extends react.Component{
	constructor(props,context){
		super(props,context);
		this.data = {firstname:"Max",lastname:"Muster"}
	}
	render(){
		return <Context target=this.data>
			<div className="my-form">
				<Binding name="firstname">
					<TextField>
				</Binding>
				<Binding name="lastname">
					<TextField>
				</Binding>
			</div>
		</Context>
	}
}
```

So, basically, you render a `Context` component containing one or more `Binding`
components containing one component capable of handling the binding.

To `Context` you pass the data-object using the `target` prop. The `Binding`
components need the `name` prop, which property on the data-object holds the
value they should manage.

A component is capable of handling the binding when it takes a `value` prop and
a `onChange` prop. The `value` prop holds the value of the property of the
data-object. The `onChange` prop is a function that must be called with the new
value as first argument as soon as the value was changed in the component.

This means, that a normal `input` does not support the binding, since it calls
onChange with an event-object as first parameter. In order to make it work,
you need to wrap it to support the API.

reference
---------

### Context
- `target` (object):
The object holding the data you want to bind your UI to.
- `name` (string):
You can also nest `Context` components. On nested ones, you can set a `name`
**instead** of `target`. It then takes its target from the parent context.
- `validator` (Validator) (optional): A validator to validate the data everytime
data was changed.

### Binding
- `name` (string):
The name of the property of the context's data-object you want to bind to

### Bindable components
In order to make a Component bindable, it has to support the following API:
- `value` (any): The value this component must render and make editable
- `onChange(value)` (any): The function this component must call when the value
was changed, with the new value as first argument
- `errors` (array of Error objects): If `validator` was specified on `Context`
then you get an array of errors on this field. It's zero-length if there aren't any.

### Validator
A validator is any function that takes an object as first parameter and returns
an array of zero or more Errors.

### Error
Errors are returned by a Validator's `validate` function. The are read-only objects.
They have the following properties:
- fields (string[]): An array of property names this error applies to
- message (string): A string describing the error
