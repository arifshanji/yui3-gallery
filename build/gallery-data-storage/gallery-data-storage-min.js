YUI.add("gallery-data-storage",function(E){var F="yui"+(new Date()).getTime(),C=0,B={cache:{},expando:F,data:function(I,H,L){var M=I[B.expando],G=B.cache,K,J=I instanceof E.Node;if(!M&&typeof H==="string"&&L===undefined){return;}if(!J){G=I;M=B.expando;}else{if(!M){I[F]=M=++C;}}if(typeof H==="object"){G[M]=E.aggregate({},H);}else{if(!G[M]){G[M]={};}}K=G[M];if(L!==undefined){K[H]=L;}return typeof H==="string"?K[H]:K;},removeData:function(I,H){var L=I[B.expando],G=B.cache,K=I instanceof E.Node,J=K?G[L]:L;if(H){if(J){delete J[H];if(!E.Object.size(J)){B.removeData(I);}}}else{delete I[B.expando];if(K){delete G[L];}}}};var D=function(){};D.prototype={data:function(G,I){if(typeof G==="undefined"){return B.data(this);}else{if(typeof G==="object"){B.data(this,G);return this;}}var J=G.split("."),H;J[1]=J[1]?"."+J[1]:"";if(I===undefined){H=B.data(this,G);return H===undefined&&J[1]?this.data(J[0]):H;}else{B.data(this,G,I);return this;}},removeData:function(G){B.removeData(this,G);return this;}};E.augment(E.Node,D);var A=function(){};A.prototype={data:function(G,I){if(typeof G==="undefined"){return B.data(this.item(0));}else{if(typeof G==="object"){this.each(function(){this.data(G);});return this;}}var J=G.split("."),H;J[1]=J[1]?"."+J[1]:"";if(I===undefined){H=B.data(this.item(0),G);return H===undefined&&J[1]?this.data(J[0]):H;}else{this.each(function(){this.data(G,I);});return this;}},removeData:function(G){this.each(function(){this.removeData(G);});return this;}};E.augment(E.NodeList,A);E.DataStorage=B;},"@VERSION@",{requires:["node"]});