webpackJsonp([1],{"9I3x":function(t,e){},VZrM:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{closeEye:!1,text:"我是小笼包鸡"}},mounted:function(){var t=this;this.$refs.eye1.addEventListener("animationend",function(){t.closeEye=!1})},methods:{clickFn:function(){var t=this;clearTimeout(this.timmer),this.closeEye=!0,this.text="干嘛点我",this.timmer=setTimeout(function(){t.text="我是小笼包鸡"},2e3)}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chicken-box"},[s("div",{staticClass:"box"},[t._v("\n        "+t._s(t.text)+"\n    ")]),t._v(" "),s("div",{class:{chiken:!0,"close-eye":t.closeEye},on:{click:t.clickFn}},[s("div",{staticClass:"body"}),t._v(" "),t._m(0),t._v(" "),s("div",{staticClass:"face"},[s("div",{staticClass:"month"}),t._v(" "),s("div",{ref:"eye1",staticClass:"eye eye_1"}),t._v(" "),s("div",{staticClass:"eye eye_2"})]),t._v(" "),t._m(1),t._v(" "),t._m(2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hair"},[e("div",{staticClass:"hair_1"}),this._v(" "),e("div",{staticClass:"hair_2"}),this._v(" "),e("div",{staticClass:"hair_3"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"hands"},[e("div",{staticClass:"hand left"}),this._v(" "),e("div",{staticClass:"hand right"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"foots"},[e("div",{staticClass:"foot left"}),this._v(" "),e("div",{staticClass:"foot right"})])}]};var n=s("VU/8")(i,a,!1,function(t){s("pR/W")},"data-v-7f11732e",null).exports,c={data:function(){return{infoList:[{title:"Nickname",value:"fe_bean | win7killer"},{title:"Sex",value:"male"},{title:"Profession",value:"FE-developer"},{title:"Area",value:"Asia"},{title:"Country",value:"China"},{title:"E-mail",value:"win7killer@163.com"}]}},props:{cHeight:Number},components:{Chicken:n}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main",attrs:{id:"main"}},[t._m(0),t._v(" "),s("Chicken",{staticClass:"pos-chicken"}),t._v(" "),s("ul",{staticClass:"info no-style-list"},t._l(t.infoList,function(e,i){return s("li",{key:i,staticClass:"field"},[s("span",{staticClass:"title text-right"},[t._v(t._s(e.title)+":")]),t._v(" "),s("span",{staticClass:"value"},[t._v(t._s(e.value))])])}))],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",[this._v("FE_Bean's show\n        "),e("p",{staticClass:"desc text-right"},[this._v("-- Just a little FE...")])])}]};var r=s("VU/8")(c,l,!1,function(t){s("vOYY"),s("9I3x")},"data-v-0c22cab8",null);e.default=r.exports},"pR/W":function(t,e){},vOYY:function(t,e){}});