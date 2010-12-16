YUI.add("gallery-base-componentmgr",function(Y){
/*
	 * Base Component Manager
	 * 
	 * Oddnut Software
	 * Copyright (c) 2010 Eric Ferraiuolo - http://eric.ferraiuolo.name
	 * YUI BSD License - http://developer.yahoo.com/yui/license.html
	 */
var ComponentMgr,REQUIRES="requires",INITIALIZER="initializer",INSTANCE="instance",E_INIT_COMPONENT="initComponent",E_INIT_COMPONENTS="initComponents",YLang=Y.Lang,isArray=YLang.isArray,isString=YLang.isString,isObject=YLang.isObject,isFunction=YLang.isFunction,noop=function(){};ComponentMgr=function(){this._initComponentMgr.apply(this,arguments);};ComponentMgr._COMPONENT_CFG=[REQUIRES,INITIALIZER,INSTANCE];ComponentMgr.prototype={_components:null,_initComponentMgr:function(){this._components=new Y.State();this._initComponentHierarchy();this.publish(E_INIT_COMPONENT,{defaultFn:this._defInitComponentFn});this.publish(E_INIT_COMPONENTS,{defaultFn:this._defInitComponentsFn,fireOnce:true});if(this.get("initialized")){this.fire(E_INIT_COMPONENTS,{componentsToInit:[]});}else{this.after("initializedChange",function(e){this.fire(E_INIT_COMPONENTS,{componentsToInit:[]});});}},addComponent:function(name,config){if(!isString(name)){return;}if(!isObject(config)){return;}var components=this._components,requires=config.requires,initializer=config.initializer,instance=config.instance;initializer=isFunction(initializer)?initializer:isString(initializer)&&isFunction(this[initializer])?this[initializer]:noop;components.add(name,REQUIRES,requires);components.add(name,INITIALIZER,initializer);components.add(name,INSTANCE,instance);},getComponent:function(component){return this._components.get(component,INSTANCE);},useComponent:function(){var args=Y.Array(arguments,0,true),callback=isFunction(args[args.length-1])?args[args.length-1]:noop,components=callback===noop?args:args.slice(0,-1),instances=[],initialized;if(components.length<1){callback.call(this);return;}initialized=Y.Array.partition(components,function(c){var instance=this.getComponent(c);instances.push(instance);return instance;},this);if(initialized.rejects.length>0){Y.use.apply(Y,this._getRequires(initialized.rejects).concat(Y.bind(function(Y){var instances=[];Y.Array.each(initialized.rejects,this._initComponent,this);Y.Array.each(components,function(c){instances.push(this.getComponent(c));},this);callback.apply(this,instances);},this)));}else{callback.apply(this,instances);}},_initComponentHierarchy:function(){var classes=this._getClasses(),components={},componentConfigProps=ComponentMgr._COMPONENT_CFG,i,mergeComponentConfigs;mergeComponentConfigs=function(config,name){if(!components[name]){components[name]=Y.mix({},config,true,componentConfigProps);}else{Y.mix(components[name],config,true,componentConfigProps);}};for(i=classes.length-1;i>=0;i--){Y.Object.each(classes[i].COMPONENTS,mergeComponentConfigs);}Y.Object.each(components,function(config,name){this.addComponent(name,config);},this);},_getRequires:function(components){components=isArray(components)?components:[components];var requires=[];Y.Array.each(components,function(c){requires=requires.concat(this._components.get(c,REQUIRES)||[]);},this);return Y.Array.unique(requires);},_initComponent:function(c){this.fire(E_INIT_COMPONENT,{componentToInit:c});},_defInitComponentFn:function(e){var components=this._components,component=e.componentToInit,initializer=components.get(component,INITIALIZER),instance=components.get(component,INSTANCE);if(!instance&&isFunction(initializer)){instance=initializer.call(this);if(instance._yuievt&&isFunction(instance.addTarget)){instance.addTarget(this);}components.add(component,INSTANCE,instance);}e.component=instance;},_defInitComponentsFn:function(e){var components=e.componentsToInit,requires=this._getRequires(components);Y.use.apply(Y,requires.concat(Y.bind(function(Y){Y.Array.each(components,this._initComponent,this);},this)));}};Y.BaseComponentMgr=ComponentMgr;},"@VERSION@",{requires:["base-base","collection"]});