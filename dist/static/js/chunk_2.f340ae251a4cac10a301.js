webpackJsonp([2],{C4Wn:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={HelloWorld:function(){return e.e(10).then(e.bind(null,"gORT"))},ColorPicker:function(){return e.e(12).then(e.bind(null,"t1Ok"))},CodeVideo:function(){return e.e(8).then(e.bind(null,"XqU5"))},CodeGif:function(){return e.e(6).then(e.bind(null,"uL9B"))},CodePic:function(){return e.e(9).then(e.bind(null,"Z/0s"))},CharDeep:function(){return e.e(7).then(e.bind(null,"0gWr"))}},r={data:function(){return{bg:"#ccc",colorData:{rgb:"",hex:""},componentsMap:o}},computed:{componentId:function(){return this.$route.params.id},getId:function(){return this.$route.params.id}},mounted:function(){console.log(this.components)},components:o,methods:{afterPicked:function(t){this.colorData=t,this.bg=t.rgb}}},c={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"vue-demo-list clearfix"},[e("div",{staticClass:"left"},[e("h3",[t._v("Demo List")]),t._v(" "),e("ul",{staticClass:"no-style-list"},t._l(t.componentsMap,function(n,o){return e("li",{key:o,class:{cur:t.componentId===o}},[e("router-link",{attrs:{to:"/vue_demo/"+o}},[t._v(t._s(o))])],1)}))]),t._v(" "),e("div",{staticClass:"right"},["ColorPicker"===t.componentId?e("div",{staticClass:"color-picker-demo",style:{background:t.bg}},[e("ColorPicker",{on:{afterPicked:t.afterPicked}}),t._v(" "),e("p",{class:["show-color",t.colorData.isDeep?"":"black"]},[e("span",{staticClass:"rgb"},[t._v("RGB: "+t._s(t.colorData.rgb))]),t._v(" "),e("span",{staticClass:"hex"},[t._v("HEX: "+t._s(t.colorData.hex))])])],1):[e(t.componentId,{tag:"component"})]],2)])},staticRenderFns:[]};var i=e("VU/8")(r,c,!1,function(t){e("Sluh")},null,null);n.default=i.exports},Sluh:function(t,n){}});