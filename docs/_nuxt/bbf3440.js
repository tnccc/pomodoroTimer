(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{259:function(t,e,o){var content=o(270);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(75).default)("006fc8d2",content,!0,{sourceMap:!1})},268:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjEiIGN5PSIxNSIgcj0iMiIgZmlsbD0iIzcwNzA3MCIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIyIiBmaWxsPSIjNzA3MDcwIi8+CjxjaXJjbGUgY3g9IjkiIGN5PSIxNSIgcj0iMiIgZmlsbD0iIzcwNzA3MCIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSIxNSIgZmlsbD0iI0QzRTNGRCIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPC9zdmc+Cg=="},269:function(t,e,o){"use strict";var n=o(259),r=o.n(n);o.d(e,"default",(function(){return r.a}))},270:function(t,e,o){var n=o(74)(!1);n.push([t.i,"@import url(https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Open+Sans:wght@400;500;600;700&display=swap);"]),n.push([t.i,'.wrapper_ULbm7{min-width:300px;border-left:2px solid #e2e8f0}.container_hj281{padding:0 calc(var(--sv)*4)}.heading_ePX\\+w{font-weight:bolder}.heading_container_MxAJY{display:grid;grid-template-columns:2fr 1fr}.heading_button_rUmwT{margin-left:auto;width:2rem}.todo_list_Us9iD{margin-top:calc(var(--sv)*2.5);display:grid;align-items:start;justify-items:start;place-items:start;grid-gap:calc(var(--sv)*3) 0;gap:calc(var(--sv)*3) 0}.todo_item_IsetW{padding:calc(var(--sv)*2);width:100%;display:flex;align-items:center;color:#5f6368;grid-gap:0 var(--sv);gap:0 var(--sv);border:2px dashed #cbd5e1;border-radius:12px;box-shadow:0 0 10px 3px rgba(0,0,0,.1)}.todo_item_IsetW:before{background-color:#5f6368}.todo_item_IsetW:after,.todo_item_IsetW:before{content:"";display:block;width:13px;height:2px}.todo_item_IsetW:after{position:absolute;background:#5f6368;transform:rotate(90deg)}.todo_item_add_jHncm{padding:calc(var(--sv)*2);width:100%;border:2px solid #cbd5e1;border-radius:12px;box-shadow:0 0 10px 3px rgba(0,0,0,.1)}.todo_item_add_jHncm textarea{width:100%;resize:none}.todo_item_add_jHncm textarea::-moz-placeholder{color:rgba(95,99,104,.5)}.todo_item_add_jHncm textarea::placeholder{color:rgba(95,99,104,.5)}.todo_item_btn_fBHkX{display:flex;justify-content:center;align-items:center;width:6rem;max-height:4rem;font-family:"Open Sans";color:#f6f8fc;border-radius:10px;background-color:#0b57d0;letter-spacing:.1em;padding:2px 0}.todo_item_btn_area_UdZ\\+6{display:flex;grid-gap:0 calc(var(--sv)*3.5);gap:0 calc(var(--sv)*3.5)}',""]),n.locals={wrapper:"wrapper_ULbm7",container:"container_hj281",heading:"heading_ePX+w",heading_container:"heading_container_MxAJY",heading_button:"heading_button_rUmwT",todo_list:"todo_list_Us9iD",todo_item:"todo_item_IsetW",todo_item_add:"todo_item_add_jHncm",todo_item_btn:"todo_item_btn_fBHkX",todo_item_btn_area:"todo_item_btn_area_UdZ+6"},t.exports=n},273:function(t,e,o){"use strict";o.r(e);o(46),o(34),o(45),o(19),o(77),o(35),o(78);var n=o(33),r=o(42);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var c={name:"TodoList",data:function(){return{task:"",taskDisplay:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(r.b)(["todos"])),methods:{taskInsert:function(){}}},l=c,_=o(269),m=o(43);var component=Object(m.a)(l,(function(){var t=this,e=t._self._c;return e("div",{class:t.$style.wrapper},[e("div",{class:t.$style.container},[e("div",{class:t.$style.heading_container},[e("h2",{class:t.$style.heading},[t._v("\n        Tasks\n        "),e("span",{class:t.$style.num},[t._v(t._s(t.task))])]),t._v(" "),e("button",{class:t.$style.heading_button},[e("img",{attrs:{src:o(268),alt:"taskmenu"}})])]),t._v(" "),e("div",{class:t.$style.todo},[e("div",{class:t.$style.todo_list},t._l(t.todos,(function(o,n){return t.taskDisplay?e("div",{class:t.$style.todo_item_add},[e("textarea",{attrs:{type:"textarea",placeholder:"簡単な説明を入力しましょう。"}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.task,expression:"task"}],attrs:{type:"input"},domProps:{value:t.task},on:{input:function(e){e.target.composing||(t.task=e.target.value)}}}),t._v(" "),e("div",{class:t.$style.todo_item_btn_area},[e("button",{class:[t.$style.todo_item_btn,t.$style.todo_item_save]},[e("span",{on:{click:t.taskInsert}},[t._v("\n                Save\n              ")])]),t._v(" "),e("button",{class:[t.$style.todo_item_btn,t.$style.todo_item_cancel],on:{click:function(e){t.taskDisplay=!t.taskDisplay}}},[e("span",[t._v("Cansel")])])])]):e("button",{key:"index",class:t.$style.todo_item,on:{click:function(e){t.taskDisplay=!t.taskDisplay}}},[t._v("\n            "+t._s(o.task)+"\n        ")])})),0)])])])}),[],!1,(function(t){this.$style=_.default.locals||_.default}),null,null);e.default=component.exports}}]);