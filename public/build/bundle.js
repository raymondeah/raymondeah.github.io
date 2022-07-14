var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function r(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function o(t,e){t.appendChild(e)}function l(t,e,n){t.insertBefore(e,n||null)}function i(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function u(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function d(){return t=" ",document.createTextNode(t);var t}function f(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let m;function p(t){m=t}const v=[],g=[],h=[],$=[],w=Promise.resolve();let b=!1;function k(t){h.push(t)}const y=new Set;let x=0;function _(){const t=m;do{for(;x<v.length;){const t=v[x];x++,p(t),M(t.$$)}for(p(null),v.length=0,x=0;g.length;)g.pop()();for(let t=0;t<h.length;t+=1){const e=h[t];y.has(e)||(y.add(e),e())}h.length=0}while(v.length);for(;$.length;)$.pop()();b=!1,y.clear(),p(t)}function M(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const C=new Set;function z(t,e){t&&t.i&&(C.delete(t),t.i(e))}function L(t,e,n,s){if(t&&t.o){if(C.has(t))return;C.add(t),undefined.c.push((()=>{C.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}function H(t){t&&t.c()}function E(t,n,a,o){const{fragment:l,on_mount:i,on_destroy:c,after_update:u}=t.$$;l&&l.m(n,a),o||k((()=>{const n=i.map(e).filter(r);c?c.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(k)}function S(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function T(t,e){-1===t.$$.dirty[0]&&(v.push(t),b||(b=!0,w.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,r,a,o,l,c,u,d=[-1]){const f=m;p(e);const v=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(f?f.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:r.target||f.$$.root};u&&u(v.root);let g=!1;if(v.ctx=a?a(e,r.props||{},((t,n,...s)=>{const r=s.length?s[0]:n;return v.ctx&&l(v.ctx[t],v.ctx[t]=r)&&(!v.skip_bound&&v.bound[t]&&v.bound[t](r),g&&T(e,t)),n})):[],v.update(),g=!0,s(v.before_update),v.fragment=!!o&&o(v.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);v.fragment&&v.fragment.l(t),t.forEach(i)}else v.fragment&&v.fragment.c();r.intro&&z(e.$$.fragment),E(e,r.target,r.anchor,r.customElement),_()}p(f)}class j{$destroy(){S(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function I(e){let n;return{c(){n=c("section"),n.innerHTML='<div class="nav svelte-peu5sl"><a href="#about" class="svelte-peu5sl">about</a> \n        <a href="#projects" class="svelte-peu5sl">projects</a> \n        <a href="#contact" class="svelte-peu5sl">contact</a> \n        <a href="Eah_Raymond.pdf" target="_blank" class="svelte-peu5sl">resume</a></div> \n    \n    <div class="landing svelte-peu5sl"><div class="temp"><p class="big intro svelte-peu5sl">Hi, I&#39;m</p> \n            <p class="big name svelte-peu5sl">Raymond Eah</p> \n            <p class="small svelte-peu5sl">A student and developer interested in front end and full stack development.</p></div></div>',f(n,"class","svelte-peu5sl")},m(t,e){l(t,n,e)},p:t,i:t,o:t,d(t){t&&i(n)}}}class B extends j{constructor(t){super(),R(this,t,null,I,a,{})}}function A(e){let n;return{c(){n=c("section"),n.innerHTML='<div class="container svelte-zrgpgc"><div class="left svelte-zrgpgc"><h2 class="svelte-zrgpgc">About Me</h2> \n    \n            <p>Hi! My name is Raymond (Ray) Eah and I&#39;m a third-year student at Northeastern University studying \n            Computer Science.</p> \n            \n            <p>Currently, I&#39;m at <a href="https://www.oracle.com/" target="_blank" class="svelte-zrgpgc">Oracle</a> as a Software Engineer Intern, working on microservices and DevOps across an array of SaaS products related to project management.</p> \n            \n            <p>Last winter, I was at <a href="https://www.northeastern.edu/kostas/" target="_blank" class="svelte-zrgpgc">Kostas Research Institute</a> as a Data Science Co-op, where I worked on an R&amp;D project in the geospatial sector involving remote sensing and satellite imaging data.</p> \n            \n            <p>In my free time, I enjoy playing volleyball, cooking, and fitness.</p></div> \n        <div class="right svelte-zrgpgc"><img src="images/wave.png" alt="" class="svelte-zrgpgc"/></div></div>',f(n,"id","about"),f(n,"class","about svelte-zrgpgc")},m(t,e){l(t,n,e)},p:t,i:t,o:t,d(t){t&&i(n)}}}class V extends j{constructor(t){super(),R(this,t,null,A,a,{})}}function P(e){let n,s;return{c(){n=u("svg"),s=u("path"),f(s,"stroke-width","0"),f(s,"fill","currentColor"),f(s,"d","M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"),f(n,"viewBox","0 0 64 64"),f(n,"id","i-github"),f(n,"xmlns","http://www.w3.org/2000/svg")},m(t,e){l(t,n,e),o(n,s)},p:t,i:t,o:t,d(t){t&&i(n)}}}class N extends j{constructor(t){super(),R(this,t,null,P,a,{})}}function O(e){let n,s,r,a;return{c(){n=u("svg"),s=u("path"),r=u("polyline"),a=u("line"),f(s,"d","M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"),f(r,"points","15 3 21 3 21 9"),f(a,"x1","10"),f(a,"y1","14"),f(a,"x2","21"),f(a,"y2","3"),f(n,"xmlns","http://www.w3.org/2000/svg"),f(n,"viewBox","0 0 24 24"),f(n,"fill","none"),f(n,"stroke","currentColor"),f(n,"stroke-width","2"),f(n,"stroke-linecap","round"),f(n,"stroke-linejoin","round")},m(t,e){l(t,n,e),o(n,s),o(n,r),o(n,a)},p:t,i:t,o:t,d(t){t&&i(n)}}}class U extends j{constructor(t){super(),R(this,t,null,O,a,{})}}function D(e){let n,s,r,a,u,m,p,v,g,h,$,w,b,k,y,x,_,M,C,T,R,j;return w=new U({}),y=new N({}),{c(){n=c("section"),s=c("h2"),s.textContent="Projects",r=d(),a=c("div"),u=c("div"),m=c("div"),p=c("div"),v=c("p"),v.innerHTML="<b>RUMBLE</b>",g=d(),h=c("div"),$=c("a"),H(w.$$.fragment),b=d(),k=c("a"),H(y.$$.fragment),x=d(),_=c("div"),_.innerHTML="<p>RUMBLE is an Attack on Titan themed variant of Wordle with a limited wordbank. The puzzle resets daily, stats are tracked, and users can share their results, just like the original game. Play while you wait for Part 3!</p> \n                    <p><b>Tech Stack:</b> JavaScript, HTML, CSS</p>",M=d(),C=c("div"),C.innerHTML='<img src="images/rumble_sc_mobile.png" alt="" class="svelte-1khvto7"/>',T=d(),R=c("div"),R.innerHTML='<img src="images/rumble_sc.png" alt="" class="svelte-1khvto7"/>',f($,"class","icon svelte-1khvto7"),f($,"href","https://wordleaot.com"),f($,"target","_blank"),f(k,"class","icon svelte-1khvto7"),f(k,"href","https://github.com/raymondeah/RUMBLE"),f(k,"target","_blank"),f(h,"class","icons svelte-1khvto7"),f(p,"class","title svelte-1khvto7"),f(_,"class","summary svelte-1khvto7"),f(m,"class","desc svelte-1khvto7"),f(C,"class","mobile-img svelte-1khvto7"),f(R,"class","desktop-img svelte-1khvto7"),f(u,"class","content svelte-1khvto7"),f(a,"class","card svelte-1khvto7"),f(n,"id","projects"),f(n,"class","svelte-1khvto7")},m(t,e){l(t,n,e),o(n,s),o(n,r),o(n,a),o(a,u),o(u,m),o(m,p),o(p,v),o(p,g),o(p,h),o(h,$),E(w,$,null),o(h,b),o(h,k),E(y,k,null),o(m,x),o(m,_),o(u,M),o(u,C),o(u,T),o(u,R),j=!0},p:t,i(t){j||(z(w.$$.fragment,t),z(y.$$.fragment,t),j=!0)},o(t){L(w.$$.fragment,t),L(y.$$.fragment,t),j=!1},d(t){t&&i(n),S(w),S(y)}}}class W extends j{constructor(t){super(),R(this,t,null,D,a,{})}}function q(e){let n,s,r,a,c,d,m,p,v,g,h,$,w,b,k,y,x,_;return{c(){var t,e,o,l;n=u("svg"),s=u("g"),r=u("path"),a=u("g"),c=u("g"),d=u("g"),m=u("g"),p=u("g"),v=u("g"),g=u("g"),h=u("g"),$=u("g"),w=u("g"),b=u("g"),k=u("g"),y=u("g"),x=u("g"),_=u("g"),f(r,"d","M469.075,64.488h-448.2c-10.3,0-18.8,7.5-20.5,17.3c-0.6,2.4-0.3,322.7-0.3,322.7c0,11.4,9.4,20.8,20.8,20.8h447.1\r\n\t\tc11.4,0,20.8-8.3,21.8-19.8v-320.2C489.875,73.788,480.475,64.488,469.075,64.488z M404.275,106.088l-159.8,114.4l-159.8-114.4\r\n\t\tH404.275z M40.675,384.788v-259.9l192.4,137.2c7.8,6.3,17.2,4.4,22.9,0l192.4-137.8v260.5L40.675,384.788L40.675,384.788z"),f(n,"version","1.1"),f(n,"id","Capa_1"),f(n,"xmlns","http://www.w3.org/2000/svg"),f(n,"xmlns:xlink","http://www.w3.org/1999/xlink"),f(n,"x","0px"),f(n,"y","0px"),f(n,"viewBox","0 0 489.776 489.776"),t=n,e="enable-background",null===(o="new 0 0 489.776 489.776")?t.style.removeProperty(e):t.style.setProperty(e,o,l?"important":""),f(n,"xml:space","preserve")},m(t,e){l(t,n,e),o(n,s),o(s,r),o(n,a),o(n,c),o(n,d),o(n,m),o(n,p),o(n,v),o(n,g),o(n,h),o(n,$),o(n,w),o(n,b),o(n,k),o(n,y),o(n,x),o(n,_)},p:t,i:t,o:t,d(t){t&&i(n)}}}class G extends j{constructor(t){super(),R(this,t,null,q,a,{})}}function J(e){let n,s,r;return{c(){n=u("svg"),s=u("rect"),r=u("path"),f(s,"width","16"),f(s,"height","16"),f(s,"id","icon-bound"),f(s,"fill","none"),f(r,"d","M14.815,0H1.18C0.53,0,0,0.517,0,1.153v13.694C0,15.485,0.53,16,1.18,16h13.636C15.467,16,16,15.485,16,14.847V1.153 C16,0.517,15.467,0,14.815,0z M4.746,13.634H2.371V5.999h2.376V13.634z M3.559,4.955c-0.762,0-1.377-0.617-1.377-1.377 c0-0.759,0.615-1.376,1.377-1.376c0.759,0,1.376,0.617,1.376,1.376C4.935,4.339,4.319,4.955,3.559,4.955z M13.633,13.634h-2.371 V9.922c0-0.886-0.017-2.025-1.233-2.025c-1.235,0-1.423,0.964-1.423,1.96v3.778H6.235V5.999h2.274v1.043h0.033 c0.317-0.6,1.091-1.233,2.245-1.233c2.401,0,2.845,1.581,2.845,3.638V13.634z"),f(n,"viewBox","0 0 16 16"),f(n,"version","1.1"),f(n,"xmlns","http://www.w3.org/2000/svg"),f(n,"xmlns:xlink","http://www.w3.org/1999/xlink")},m(t,e){l(t,n,e),o(n,s),o(n,r)},p:t,i:t,o:t,d(t){t&&i(n)}}}class K extends j{constructor(t){super(),R(this,t,null,J,a,{})}}function Z(e){let n,s,r,a,u,m,p,v,g,h,$,w,b,k,y,x,_,M,C,T,R,j,I;return w=new N({}),_=new G({}),j=new K({}),{c(){n=c("section"),s=c("div"),r=c("div"),r.innerHTML='<h2>Get in touch</h2> \n            <p class="desc svelte-fwtvim">I&#39;m looking for internship opportunities for Winter 2023 and Summer 2023. If you think I&#39;m a good fit, shoot me an email! Regardless, my inbox is always open, so don&#39;t be afraid to reach out!</p>',a=d(),u=c("div"),m=c("a"),m.innerHTML='<div class="resume svelte-fwtvim">Resume</div>',p=d(),v=c("div"),g=c("a"),h=c("div"),$=c("div"),H(w.$$.fragment),b=d(),k=c("a"),y=c("div"),x=c("div"),H(_.$$.fragment),M=d(),C=c("a"),T=c("div"),R=c("div"),H(j.$$.fragment),f(r,"class","left svelte-fwtvim"),f(m,"href","Eah_Raymond.pdf"),f(m,"target","_blank"),f(m,"class","svelte-fwtvim"),f($,"class","icon svelte-fwtvim"),f(h,"class","icon-container svelte-fwtvim"),f(g,"href","https://github.com/raymondeah"),f(g,"target","_blank"),f(g,"class","svelte-fwtvim"),f(x,"class","icon svelte-fwtvim"),f(y,"class","icon-container svelte-fwtvim"),f(k,"href","mailto:eah.r@northeastern.edu"),f(k,"target","_blank"),f(k,"class","svelte-fwtvim"),f(R,"class","icon li svelte-fwtvim"),f(T,"class","icon-container svelte-fwtvim"),f(C,"href","https://linkedin.com/in/raymondeah"),f(C,"target","_blank"),f(C,"class","svelte-fwtvim"),f(v,"class","icons svelte-fwtvim"),f(u,"class","right svelte-fwtvim"),f(s,"class","container svelte-fwtvim"),f(n,"id","contact"),f(n,"class","svelte-fwtvim")},m(t,e){l(t,n,e),o(n,s),o(s,r),o(s,a),o(s,u),o(u,m),o(u,p),o(u,v),o(v,g),o(g,h),o(h,$),E(w,$,null),o(v,b),o(v,k),o(k,y),o(y,x),E(_,x,null),o(v,M),o(v,C),o(C,T),o(T,R),E(j,R,null),I=!0},p:t,i(t){I||(z(w.$$.fragment,t),z(_.$$.fragment,t),z(j.$$.fragment,t),I=!0)},o(t){L(w.$$.fragment,t),L(_.$$.fragment,t),L(j.$$.fragment,t),I=!1},d(t){t&&i(n),S(w),S(_),S(j)}}}class F extends j{constructor(t){super(),R(this,t,null,Z,a,{})}}function Q(e){let n;return{c(){n=c("section"),n.innerHTML="<p>Built with Svelte by Raymond Eah</p>",f(n,"class","svelte-ik6zaa")},m(t,e){l(t,n,e)},p:t,i:t,o:t,d(t){t&&i(n)}}}class X extends j{constructor(t){super(),R(this,t,null,Q,a,{})}}function Y(e){let n,s,r,a,o,c,u,f,m,p;return n=new B({}),r=new V({}),o=new W({}),u=new F({}),m=new X({}),{c(){H(n.$$.fragment),s=d(),H(r.$$.fragment),a=d(),H(o.$$.fragment),c=d(),H(u.$$.fragment),f=d(),H(m.$$.fragment)},m(t,e){E(n,t,e),l(t,s,e),E(r,t,e),l(t,a,e),E(o,t,e),l(t,c,e),E(u,t,e),l(t,f,e),E(m,t,e),p=!0},p:t,i(t){p||(z(n.$$.fragment,t),z(r.$$.fragment,t),z(o.$$.fragment,t),z(u.$$.fragment,t),z(m.$$.fragment,t),p=!0)},o(t){L(n.$$.fragment,t),L(r.$$.fragment,t),L(o.$$.fragment,t),L(u.$$.fragment,t),L(m.$$.fragment,t),p=!1},d(t){S(n,t),t&&i(s),S(r,t),t&&i(a),S(o,t),t&&i(c),S(u,t),t&&i(f),S(m,t)}}}return new class extends j{constructor(t){super(),R(this,t,null,Y,a,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
