(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(e,t,n){e.exports=n(48)},37:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(18),o=n.n(i),l=n(8),s=n(9),c=n(11),u=n(10),d=n(12),g=n(21),f=n(13),m=n(14),h=n(2),p=function(e,t,n,a){return h.g(e).force("link",h.e(t).distance(a/20).id(function(e){return e.id})).force("charge",h.f()).force("collision",h.d().radius(function(e){return e.r+10})).force("center",h.c(.6*a,n/2))},y=function(e,t,n,a){return e.classed("node",!0).append("g").attr("stroke","#fff").attr("stroke-width",1.5).selectAll("circle").data(t).join("circle").attr("r",10).style("fill",n).call(a)},_=function(e,t){return e.classed("desc",!0).append("g").attr("stroke","#999").selectAll("text").data(t).join("text").text(function(e){return e.id})},v=function(e,t){return e.classed("link",!0).append("g").attr("stroke","#999").attr("stroke-opacity",.6).selectAll("line").data(t).join("line").attr("stroke-width",function(e){return Math.sqrt(e.value)})},b=function(e,t,n,a,r,i,o,l){return l.nodes(t),l.force("link").links(i),l.alpha(1).restart(),(e=e.data(t,function(e){return e.id})).exit().remove(),e=e.enter().append("circle").attr("r",10).style("fill",n).merge(e).call(a),(r=r.data(i,function(e){return e.source.id+"-"+e.target.id})).exit().remove(),r=r.enter().append("line").merge(r),o&&((o=o.data(t,function(e){return e.id})).exit().remove(),o=o.enter().append("text").text(function(e){return e.id}).merge(o).call(a)),{nodeSelection:e,linkSelection:r,textSelection:o}},E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).myRef=void 0,n.componentDidMount=function(){if(n.myRef.current){var e=[{id:"a"},{id:"b"},{id:"c"},{id:"d"}],t=[{source:"a",value:1,target:"b"},{source:"a",value:1,target:"c"},{source:"b",value:1,target:"c"},{source:"d",value:1,target:"b"}],a=e.map(function(e){return JSON.parse(JSON.stringify(e))}),r=t.map(function(e){return JSON.parse(JSON.stringify(e))}),i=h.h(n.myRef.current),o=n.myRef.current.width.baseVal.value,l=n.myRef.current.height.baseVal.value,s=p(a,r,l,o),c=function(e){return h.a().on("start",function(t){h.b.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}).on("drag",function(e){e.fx=h.b.x,e.fy=h.b.y}).on("end",function(t){h.b.active||e.alphaTarget(0),t.fx=null,t.fy=null})},u=y(i,a,"#5B8BDA",c(s)),d=v(i,r);s.on("tick",function(){u.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),d.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})});var g=window.setInterval(function(){if(e.length<8){var n=Math.random().toString(),i=Math.floor(Math.random()*e.length)-1;-1===i&&(i=0);var o=Math.floor(Math.random()*e.length)-1;-1===o&&(o=0),e=[].concat(Object(m.a)(e),[{id:n}]),t=[].concat(Object(m.a)(t),[{source:n,value:1,target:e[i].id}]),a=e.map(function(e){return JSON.parse(JSON.stringify(e))}),r=t.map(function(e){return JSON.parse(JSON.stringify(e))});var l=b(u,a,"#5B8BDA",c(s),d,r,null,s);u=l.nodeSelection,d=l.linkSelection}},2e3);n.setState({intervalId:g})}},n.state={intervalId:-1},n.myRef=r.a.createRef(),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("svg",{ref:this.myRef,width:"100vw",height:"100vh"})}},{key:"componentWillUnmount",value:function(){this.state.intervalId&&window.clearInterval(this.state.intervalId),this.state.d3Timer&&this.state.d3Timer.stop()}}]),t}(a.Component),x=(n(37),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"landing"},r.a.createElement("h1",null,"Graphalizer",r.a.createElement("span",{className:"loader__dot"},"."),r.a.createElement("span",{className:"loader__dot"},"."),r.a.createElement("span",{className:"loader__dot"},".")),r.a.createElement("h2",null,"Data visualization learning tool"),r.a.createElement(g.b,{to:"/grapher"},r.a.createElement("button",null,"Get Started"))),r.a.createElement(E,null))}}]),t}(a.Component)),S=n(22),O=n(23),k=function(e){return"object"===typeof e&&e.hasOwnProperty("id")},A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).myRef=void 0,n.componentDidMount=function(){if(null!==n.myRef.current){var e=n.props.graph.nodesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),t=n.props.graph.edgesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),a=h.h(n.myRef.current),r=n.myRef.current.width.baseVal.value,i=n.myRef.current.height.baseVal.value,o=p(e,t,i,r),l=function(e){return h.a().on("start",function(t){h.b.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y}).on("drag",function(e){e.fx=h.b.x,e.fy=h.b.y}).on("end",function(t){h.b.active||e.alphaTarget(0),t.fx=null,t.fy=null})},s=y(a,e,"#5B8BDA",l(o)),c=v(a,t),u=_(a,e);n.setState({d3node:s,d3text:u,d3link:c,d3Graph:a,drag:l,simulation:o}),o.on("tick",function(){s.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),u.attr("x",function(e){return e.x+10}).attr("dy",function(e){return e.y}),c.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})})}},n.handleChange=function(e){if(null!==e.target){var t=e.target,a=t.name,r=t.value;n.setState(Object(S.a)({},a,r))}},n.nodeListVis=function(e){e.preventDefault(),n.state.node_list_visibility?n.setState({node_list_visibility:!1}):n.setState({node_list_visibility:!0})},n.nodeFormVis=function(e){e.preventDefault(),n.setState({node_form_visibility:!0})},n.edgeListVis=function(e){e.preventDefault(),n.state.edge_list_visibility?n.setState({edge_list_visibility:!1}):n.setState({edge_list_visibility:!0})},n.edgeFormVis=function(e){e.preventDefault(),n.setState({edge_form_visibility:!0})},n.handleNodeSubmit=function(e){e.preventDefault();var t=n.props.graph.nodesArray,a=new Set;if(t.forEach(function(e){a.add(e.id)}),e.preventDefault(),n.setState({node_id_message:""}),n.state.node_id.length<=0)n.setState({node_id_message:"Empty field, please enter information"});else if(a.has(n.state.node_id))n.setState({node_id_message:"ID already taken, please set a new ID"});else if(n.state.node_id.length>0&&!a.has(n.state.node_id)){var r={id:n.state.node_id};n.props.addNode(r),n.setState({node_form_visibility:!1},function(){var e=n.props.graph.nodesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),t=n.props.graph.edgesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),a=h.h(n.myRef.current),r=a.selectAll(".node"),i=a.selectAll(".desc"),o=a.selectAll(".link"),l=b(n.state.d3node,e,"#5B8BDA",n.state.drag(n.state.simulation),n.state.d3link,t,n.state.d3text,n.state.simulation);r=l.nodeSelection,i=l.textSelection,o=l.linkSelection,n.state.simulation.on("tick",function(){r.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),i.attr("x",function(e){return e.x+10}).attr("dy",function(e){return e.y}),o.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})}),n.setState({d3link:o,d3node:r,d3text:i})})}},n.handleEdgeSubmit=function(e){if(e.preventDefault(),console.log("clicked"),n.setState({edge_source_message:"",edge_target_message:"",edge_weight_message:""}),n.state.edge_source.length<=0&&n.setState({edge_source_message:"Please select a source node or create a node first"}),n.state.edge_weight<=0&&n.setState({edge_weight_message:"Please enter a weight for the edge"}),n.state.edge_target.length<=0&&n.setState({edge_target_message:"Please select a target node or create a node first"}),n.state.edge_source.length>0&&n.state.edge_weight>0&&n.state.edge_target.length>0){var t={source:n.state.edge_source,value:n.state.edge_weight,target:n.state.edge_target};n.props.addEdge(t),n.setState({edge_form_visibility:!1},function(){var e=n.props.graph.nodesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),t=n.props.graph.edgesArray.map(function(e){return JSON.parse(JSON.stringify(e))}),a=h.h(n.myRef.current),r=a.selectAll(".node"),i=a.selectAll(".desc"),o=a.selectAll(".link"),l=b(n.state.d3node,e,"#5B8BDA",n.state.drag(n.state.simulation),n.state.d3link,t,n.state.d3text,n.state.simulation);r=l.nodeSelection,i=l.textSelection,o=l.linkSelection,console.log(o),n.state.simulation.on("tick",function(){r.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),i.attr("x",function(e){return e.x+10}).attr("dy",function(e){return e.y}),o.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})}),n.setState({d3link:o,d3node:r,d3text:i})})}},n.state={node_id:"",node_id_message:"",edge_source:"",edge_source_message:"",edge_weight:0,edge_weight_message:"",edge_target:"",edge_target_message:"",node_form_visibility:!1,node_list_visibility:!1,edge_form_visibility:!1,edge_list_visibility:!1,d3node:null,d3link:null,d3text:null,d3Graph:null,simulation:null,drag:null},n.myRef=r.a.createRef(),n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"nodeArea"},r.a.createElement("h1",null,"Nodes"),r.a.createElement("button",{onClick:function(t){return e.nodeListVis(t)}},this.state.node_list_visibility?"Hide":"Expand"),this.state.node_list_visibility?r.a.createElement("ul",null,this.props.graph.nodesArray.map(function(e,t){return r.a.createElement("li",{key:t},"Node: ",e.id)})):null,r.a.createElement("button",{onClick:this.nodeFormVis},"+"),this.state.node_form_visibility?r.a.createElement("form",null,r.a.createElement("label",{htmlFor:"node_id"},"Node"),r.a.createElement("input",{type:"text",name:"node_id",onChange:this.handleChange}),r.a.createElement("p",null,this.state.node_id_message),r.a.createElement("button",{type:"submit",onClick:this.handleNodeSubmit},"Create Node")):null),r.a.createElement("div",{className:"edgeArea"},r.a.createElement("h1",null,"Edges"),r.a.createElement("button",{onClick:this.edgeListVis},this.state.edge_list_visibility?"Hide":"Expand"),this.state.edge_list_visibility?r.a.createElement("div",{className:"edgeList"},this.props.graph.edgesArray.map(function(e,t){return r.a.createElement("div",{key:t},"object"===typeof(n=e.source)&&n.hasOwnProperty("id")&&k(e.target)?r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Source Node: ",e.source.id),r.a.createElement("h2",null,"Weight:",e.value),r.a.createElement("h2",null,"Target Node: ",e.target.id)):null);var n}),"}"):null,r.a.createElement("button",{onClick:this.edgeFormVis},"+"),this.state.edge_form_visibility?r.a.createElement("form",null,r.a.createElement("label",{htmlFor:"edge_source"},"Source Node"),r.a.createElement("select",{name:"edge_source",onChange:this.handleChange},r.a.createElement("option",{value:""},"Node Source"),this.props.graph.nodesArray.map(function(e,t){return k(e)?r.a.createElement("option",{value:e.id,key:t},e.id):null})),r.a.createElement("p",null,this.state.edge_source_message),r.a.createElement("label",{htmlFor:"edge_weight"},"Edge Weight"),r.a.createElement("input",{type:"number",name:"edge_weight",min:"0",onChange:this.handleChange}),r.a.createElement("p",null,this.state.edge_weight_message),r.a.createElement("label",{htmlFor:"edge_target"},"Target Node"),r.a.createElement("select",{name:"edge_target",onChange:this.handleChange},r.a.createElement("option",{value:""},"Node Target"),this.props.graph.nodesArray.map(function(e,t){return k(e)?r.a.createElement("option",{value:e.id,key:t},e.id):null})),r.a.createElement("p",null,this.state.edge_target_message),r.a.createElement("button",{type:"submit",onClick:this.handleEdgeSubmit},"Create Edge")):null),r.a.createElement("svg",{ref:this.myRef,width:"60vw",height:"100vh"}))}}]),t}(a.Component),N=Object(O.b)(function(e){return{graph:e}},function(e){return{addNode:function(t){return e({type:"GRAPHADDNODE",payload:t})},addEdge:function(t){return e((n=t,console.log(n),{type:"GRAPHADDEDGE",payload:n}));var n}}})(A),w=(n(47),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){document.title="Graphalizer"}},{key:"render",value:function(){return r.a.createElement(g.a,null,r.a.createElement(f.a,{path:"/",exact:!0,component:x}),r.a.createElement(f.a,{path:"/grapher",exact:!0,component:N}))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var j,D=n(16),C=function(e){return function(t){return function(n){console.log("__ACTION__",n);try{var a=t(n);return console.log("__STATE__",e.getState()),a}catch(r){return r.action=n,console.error(r),r}}}},J=n(27),R={nodesArray:[],edgesArray:[]};!function(e){e.GraphAddNode="GRAPHADDNODE",e.GraphAddEdge="GRAPHADDEDGE"}(j||(j={}));var G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j.GraphAddNode:return Object(J.a)({},e,{nodesArray:[].concat(Object(m.a)(e.nodesArray),[t.payload])});case j.GraphAddEdge:return Object(J.a)({},e,{edgesArray:[].concat(Object(m.a)(e.edgesArray),[t.payload])});default:return e}},B=Object(D.c)(G,Object(D.a)(C));o.a.render(r.a.createElement(function(){return r.a.createElement(O.a,{store:B},r.a.createElement(r.a.Fragment,null,r.a.createElement(w,null)))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[32,1,2]]]);
//# sourceMappingURL=main.59565f42.chunk.js.map