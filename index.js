var react = require("react");
var PropTypes = require("prop-types");
class Context extends react.Component{
	constructor(props,context){
		super(props,context);
		this.componentWillReceiveProps(props,context);
	}
	componentWillReceiveProps(props,context){
		if(props.validator != this.props.validator) delete this.errors;
		this.target = props.target||context.context.get(props.name);
		this.fullKey = props.target?"":context.context.fullKey+props.name+".";
		this.rootContext = props.target?this:context.context.rootContext;
	}
	getChildContext(){
		return {
			context:this
		}
	}
	set(key,value){
		this.target[key] = value;
		delete this.rootContext.errors;
		if(this.props.onChange) this.props.onChange();
	}
	get(key){
		return this.target[key];
	}
	getErrors(key){
		var c = this.rootContext;
		if(!c.errors) c.errors = c.props.validator?c.props.validator(c.props.target):[];
		key = this.fullKey+key;
		return c.errors.filter(function(error){return error.fields.indexOf(key)>=0})
	}
	render(){
		return this.props.children;
	}
}
Context.childContextTypes = {
	context: PropTypes.object
}
Context.contextTypes = {
	context: PropTypes.object
}
class Binding extends react.Component{
	render(){
		return react.cloneElement(this.props.children,{
			onChange:this.onChange.bind(this),
			value:this.context.context.get(this.props.name),
			errors:this.context.context.getErrors(this.props.name)
		});
	}
	onChange(value){
		this.context.context.set(this.props.name,value);
		this.forceUpdate();
		if(this.props.onChange) this.props.onChange(value);
	}
}
Binding.contextTypes = {
	context: PropTypes.object
}
exports.Binding = Binding;
exports.Context = Context;
