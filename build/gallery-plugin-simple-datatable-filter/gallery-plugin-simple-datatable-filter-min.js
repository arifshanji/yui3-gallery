YUI.add("gallery-plugin-simple-datatable-filter",function(a){a.namespace("Plugin").SDTFilter=a.Base.create("sdt-filter",a.Plugin.Base,[],{_hostCache:null,_workingCache:null,_searchColumns:{},_host:null,initializer:function(){this._host=this.get("host");this._hostCache=this._host.get("rows");this.recache();this.beforeHostMethod("setRows",this._updateCacheFromMethod,this);this.afterHostEvent("rowsChange",this._updateCacheFromEvent,this);if(this.get("filterBy")){this.filter(this.get("filterBy"));}},recache:function(){this._workingCache=this._hostCache.concat();},destructor:function(){this._host._buildRows(this._hostCache);},search:function(b){return(b instanceof RegExp)?this.searchByRegExp(b):this.searchByString(b);},multiSearch:function(c){var b;for(b in c){this.set("column",b);this.search(c[b]);}return this._workingCache;},searchByRegExp:function(h){var g=[],d,b,c,f,e=this.get("column");for(d=0,b=this._workingCache.length;d<b;d++){c=this._workingCache[d];if(e){if(c[e]){f=c[e];if(h.test(f)){g.push(c);continue;}}}else{for(e in c){if(e.substring(0,2)==="__"){continue;}if(c[e]){f=c[e].toString();if(h.test(f)){g.push(c);break;}}}e=null;}}this._workingCache=g;return g;},searchByString:function(j){var h=[],e,c,d,g,f=this.get("column"),b=this.get("strict");for(e=0,c=this._workingCache.length;e<c;e++){d=this._workingCache[e];if(f){if(d[f]){g=d[f].toString();if(b){if(g.indexOf(j)>=0){h.push(d);continue;}}else{if(g.toLowerCase().indexOf(j.toLowerCase())>=0){h.push(d);continue;}}}}else{for(f in d){if(f.substring(0,2)==="__"){continue;}if(d[f]){g=d[f].toString();if(b){if(g.indexOf(j)>=0){h.push(d);break;}}else{if(g.toLowerCase().indexOf(j.toLowerCase())>=0){h.push(d);break;}}}}f=null;}}this._workingCache=h;return h;},filterOn:function(b,c){if(this._searchColumns[b]){this.recache();this._searchColumns[b]=c;this._updateHost(this.multiSearch(this._searchColumns));}else{this._searchColumns[b]=c;this.set("column",b);this._updateHost(this.search(c));}},filter:function(b){this.set("filterBy",b);this.recache();if(!a.Lang.isArray(b)){b=this.search(b);}this._updateHost(b);},_updateCacheFromMethod:function(c){var b=this.get("filterBy");this._hostCache=c;this.recache();if(this.get("refilterOnUpdate")&&b){this.filter(b);return new a.Do.Prevent();}},_updateCacheFromEvent:function(c){var b=this.get("filterBy");this._hostCache=c.newVal;this.recache();if(this.get("refilterOnUpdate")&&b){this.filter(b);}},_updateHost:function(b){this._host._buildRows(b);}},{NS:"filter",ATTRS:{filteredRows:{readOnly:true},column:{value:""},filterBy:{},refilterOnUpdate:{value:true},strict:{value:false}}});},"gallery-2010.12.10-17-31",{requires:["base-build","plugin"]});