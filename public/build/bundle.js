
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\icons\Hamburger.svelte generated by Svelte v3.48.0 */

    const file$9 = "src\\components\\icons\\Hamburger.svelte";

    function create_fragment$a(ctx) {
    	let svg;
    	let title;
    	let t;
    	let path0;
    	let path1;
    	let path2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			title = svg_element("title");
    			t = text("70 Basic icons by Xicons.co");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			add_location(title, file$9, 0, 60, 60);
    			attr_dev(path0, "d", "M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z");
    			attr_dev(path0, "fill", "#fff");
    			add_location(path0, file$9, 0, 102, 102);
    			attr_dev(path1, "d", "M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z");
    			attr_dev(path1, "fill", "#fff");
    			add_location(path1, file$9, 0, 168, 168);
    			attr_dev(path2, "d", "M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z");
    			attr_dev(path2, "fill", "#fff");
    			add_location(path2, file$9, 0, 234, 234);
    			attr_dev(svg, "viewBox", "0 0 48 48");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, title);
    			append_dev(title, t);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hamburger', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hamburger> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Hamburger extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hamburger",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\components\Landing.svelte generated by Svelte v3.48.0 */
    const file$8 = "src\\components\\Landing.svelte";

    function create_fragment$9(ctx) {
    	let section;
    	let div0;
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let a3;
    	let t7;
    	let div2;
    	let div1;
    	let p0;
    	let t9;
    	let p1;
    	let t11;
    	let p2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "about";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "projects";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "contact";
    			t5 = space();
    			a3 = element("a");
    			a3.textContent = "resume";
    			t7 = space();
    			div2 = element("div");
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Hi, I'm";
    			t9 = space();
    			p1 = element("p");
    			p1.textContent = "Raymond Eah";
    			t11 = space();
    			p2 = element("p");
    			p2.textContent = "A student and developer interested in front end and full stack development.";
    			attr_dev(a0, "href", "#about");
    			attr_dev(a0, "class", "svelte-1ulurtj");
    			add_location(a0, file$8, 6, 8, 119);
    			attr_dev(a1, "href", "#projects");
    			attr_dev(a1, "class", "svelte-1ulurtj");
    			add_location(a1, file$8, 7, 8, 155);
    			attr_dev(a2, "href", "#contact");
    			attr_dev(a2, "class", "svelte-1ulurtj");
    			add_location(a2, file$8, 8, 8, 197);
    			attr_dev(a3, "href", "Eah_Raymond.pdf");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-1ulurtj");
    			add_location(a3, file$8, 9, 8, 237);
    			attr_dev(div0, "class", "nav svelte-1ulurtj");
    			add_location(div0, file$8, 5, 4, 92);
    			attr_dev(p0, "class", "big intro svelte-1ulurtj");
    			add_location(p0, file$8, 14, 12, 376);
    			attr_dev(p1, "class", "big name svelte-1ulurtj");
    			add_location(p1, file$8, 15, 12, 422);
    			attr_dev(p2, "class", "small svelte-1ulurtj");
    			add_location(p2, file$8, 16, 12, 471);
    			attr_dev(div1, "class", "temp");
    			add_location(div1, file$8, 13, 8, 344);
    			attr_dev(div2, "class", "landing svelte-1ulurtj");
    			add_location(div2, file$8, 12, 4, 313);
    			attr_dev(section, "class", "svelte-1ulurtj");
    			add_location(section, file$8, 4, 0, 77);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t1);
    			append_dev(div0, a1);
    			append_dev(div0, t3);
    			append_dev(div0, a2);
    			append_dev(div0, t5);
    			append_dev(div0, a3);
    			append_dev(section, t7);
    			append_dev(section, div2);
    			append_dev(div2, div1);
    			append_dev(div1, p0);
    			append_dev(div1, t9);
    			append_dev(div1, p1);
    			append_dev(div1, t11);
    			append_dev(div1, p2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Landing', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Landing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Hamburger });
    	return [];
    }

    class Landing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Landing",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\components\About.svelte generated by Svelte v3.48.0 */

    const file$7 = "src\\components\\About.svelte";

    function create_fragment$8(ctx) {
    	let section;
    	let div2;
    	let div0;
    	let h2;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t4;
    	let a0;
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let a1;
    	let t10;
    	let t11;
    	let p3;
    	let t13;
    	let div1;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div2 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "About Me";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Hi! My name is Raymond (Ray) Eah and I'm a third-year student at Northeastern University studying \r\n            Computer Science.";
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Currently, I'm at ");
    			a0 = element("a");
    			a0.textContent = "Oracle";
    			t6 = text(" as a Software Engineer Intern, working on microservices and DevOps across an array of SaaS products related to project management.");
    			t7 = space();
    			p2 = element("p");
    			t8 = text("Last winter, I was at ");
    			a1 = element("a");
    			a1.textContent = "Kostas Research Institute";
    			t10 = text(" as a Data Science Co-op, where I worked on an R&D project in the geospatial sector involving remote sensing and satellite imaging data.");
    			t11 = space();
    			p3 = element("p");
    			p3.textContent = "In my free time, I enjoy playing volleyball, cooking, and fitness.";
    			t13 = space();
    			div1 = element("div");
    			img = element("img");
    			attr_dev(h2, "class", "svelte-zrgpgc");
    			add_location(h2, file$7, 3, 12, 105);
    			add_location(p0, file$7, 5, 12, 142);
    			attr_dev(a0, "href", "https://www.oracle.com/");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-zrgpgc");
    			add_location(a0, file$7, 11, 30, 369);
    			add_location(p1, file$7, 10, 12, 334);
    			attr_dev(a1, "href", "https://www.northeastern.edu/kostas/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-zrgpgc");
    			add_location(a1, file$7, 15, 34, 645);
    			add_location(p2, file$7, 14, 12, 606);
    			add_location(p3, file$7, 18, 12, 919);
    			attr_dev(div0, "class", "left svelte-zrgpgc");
    			add_location(div0, file$7, 2, 8, 73);
    			if (!src_url_equal(img.src, img_src_value = "images/wave.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-zrgpgc");
    			add_location(img, file$7, 23, 12, 1079);
    			attr_dev(div1, "class", "right svelte-zrgpgc");
    			add_location(div1, file$7, 22, 8, 1046);
    			attr_dev(div2, "class", "container svelte-zrgpgc");
    			add_location(div2, file$7, 1, 4, 40);
    			attr_dev(section, "id", "about");
    			attr_dev(section, "class", "about svelte-zrgpgc");
    			add_location(section, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(p1, t4);
    			append_dev(p1, a0);
    			append_dev(p1, t6);
    			append_dev(div0, t7);
    			append_dev(div0, p2);
    			append_dev(p2, t8);
    			append_dev(p2, a1);
    			append_dev(p2, t10);
    			append_dev(div0, t11);
    			append_dev(div0, p3);
    			append_dev(div2, t13);
    			append_dev(div2, div1);
    			append_dev(div1, img);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\components\icons\Github.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\components\\icons\\Github.svelte";

    function create_fragment$7(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "stroke-width", "0");
    			attr_dev(path, "fill", "currentColor");
    			attr_dev(path, "d", "M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z");
    			add_location(path, file$6, 1, 4, 80);
    			attr_dev(svg, "viewBox", "0 0 64 64");
    			attr_dev(svg, "id", "i-github");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Github', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Github> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Github extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Github",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\icons\Link.svelte generated by Svelte v3.48.0 */

    const file$5 = "src\\components\\icons\\Link.svelte";

    function create_fragment$6(ctx) {
    	let svg;
    	let path;
    	let polyline;
    	let line;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			polyline = svg_element("polyline");
    			line = svg_element("line");
    			attr_dev(path, "d", "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6");
    			add_location(path, file$5, 9, 2, 185);
    			attr_dev(polyline, "points", "15 3 21 3 21 9");
    			add_location(polyline, file$5, 10, 2, 254);
    			attr_dev(line, "x1", "10");
    			attr_dev(line, "y1", "14");
    			attr_dev(line, "x2", "21");
    			attr_dev(line, "y2", "3");
    			add_location(line, file$5, 11, 2, 294);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", "2");
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			add_location(svg, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			append_dev(svg, polyline);
    			append_dev(svg, line);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\Rumble.svelte generated by Svelte v3.48.0 */
    const file$4 = "src\\components\\Rumble.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let div9;
    	let div8;
    	let div5;
    	let div3;
    	let p0;
    	let b0;
    	let t3;
    	let div2;
    	let a0;
    	let div0;
    	let link;
    	let t4;
    	let a1;
    	let div1;
    	let github;
    	let t5;
    	let div4;
    	let p1;
    	let t7;
    	let p2;
    	let b1;
    	let t9;
    	let t10;
    	let div6;
    	let img0;
    	let img0_src_value;
    	let t11;
    	let div7;
    	let img1;
    	let img1_src_value;
    	let current;
    	link = new Link({ $$inline: true });
    	github = new Github({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Projects";
    			t1 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div5 = element("div");
    			div3 = element("div");
    			p0 = element("p");
    			b0 = element("b");
    			b0.textContent = "RUMBLE";
    			t3 = space();
    			div2 = element("div");
    			a0 = element("a");
    			div0 = element("div");
    			create_component(link.$$.fragment);
    			t4 = space();
    			a1 = element("a");
    			div1 = element("div");
    			create_component(github.$$.fragment);
    			t5 = space();
    			div4 = element("div");
    			p1 = element("p");
    			p1.textContent = "RUMBLE is an Attack on Titan themed variant of Wordle with a limited wordbank. The puzzle resets daily, stats are tracked, and users can share their results, just like the original game. Play while you wait for Part 3!";
    			t7 = space();
    			p2 = element("p");
    			b1 = element("b");
    			b1.textContent = "Tech Stack:";
    			t9 = text(" JavaScript, HTML, CSS");
    			t10 = space();
    			div6 = element("div");
    			img0 = element("img");
    			t11 = space();
    			div7 = element("div");
    			img1 = element("img");
    			add_location(h2, file$4, 8, 4, 171);
    			add_location(b0, file$4, 13, 23, 337);
    			add_location(p0, file$4, 13, 20, 334);
    			attr_dev(div0, "class", "icon svelte-1khvto7");
    			add_location(div0, file$4, 16, 28, 499);
    			attr_dev(a0, "href", "https://wordleaot.com");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$4, 15, 24, 421);
    			attr_dev(div1, "class", "icon svelte-1khvto7");
    			add_location(div1, file$4, 22, 28, 759);
    			attr_dev(a1, "class", "icon svelte-1khvto7");
    			attr_dev(a1, "href", "https://github.com/raymondeah/RUMBLE");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$4, 21, 24, 653);
    			attr_dev(div2, "class", "icons svelte-1khvto7");
    			add_location(div2, file$4, 14, 20, 376);
    			attr_dev(div3, "class", "title svelte-1khvto7");
    			add_location(div3, file$4, 12, 16, 293);
    			add_location(p1, file$4, 29, 20, 1000);
    			add_location(b1, file$4, 30, 23, 1250);
    			add_location(p2, file$4, 30, 20, 1247);
    			attr_dev(div4, "class", "summary svelte-1khvto7");
    			add_location(div4, file$4, 28, 16, 957);
    			attr_dev(div5, "class", "desc svelte-1khvto7");
    			add_location(div5, file$4, 11, 12, 257);
    			if (!src_url_equal(img0.src, img0_src_value = "images/rumble_sc_mobile.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-1khvto7");
    			add_location(img0, file$4, 44, 16, 1747);
    			attr_dev(div6, "class", "mobile-img svelte-1khvto7");
    			add_location(div6, file$4, 43, 12, 1705);
    			if (!src_url_equal(img1.src, img1_src_value = "images/rumble_sc.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1khvto7");
    			add_location(img1, file$4, 47, 16, 1870);
    			attr_dev(div7, "class", "desktop-img svelte-1khvto7");
    			add_location(div7, file$4, 46, 12, 1827);
    			attr_dev(div8, "class", "content svelte-1khvto7");
    			add_location(div8, file$4, 10, 8, 222);
    			attr_dev(div9, "class", "card svelte-1khvto7");
    			add_location(div9, file$4, 9, 4, 194);
    			attr_dev(section, "id", "projects");
    			attr_dev(section, "class", "svelte-1khvto7");
    			add_location(section, file$4, 7, 0, 142);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div5);
    			append_dev(div5, div3);
    			append_dev(div3, p0);
    			append_dev(p0, b0);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			append_dev(a0, div0);
    			mount_component(link, div0, null);
    			append_dev(div2, t4);
    			append_dev(div2, a1);
    			append_dev(a1, div1);
    			mount_component(github, div1, null);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, p1);
    			append_dev(div4, t7);
    			append_dev(div4, p2);
    			append_dev(p2, b1);
    			append_dev(p2, t9);
    			append_dev(div8, t10);
    			append_dev(div8, div6);
    			append_dev(div6, img0);
    			append_dev(div8, t11);
    			append_dev(div8, div7);
    			append_dev(div7, img1);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			transition_in(github.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(github.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(link);
    			destroy_component(github);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Rumble', slots, []);
    	let mobile = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rumble> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Github, Link, mobile });

    	$$self.$inject_state = $$props => {
    		if ('mobile' in $$props) mobile = $$props.mobile;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Rumble extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rumble",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\icons\Email.svelte generated by Svelte v3.48.0 */

    const file$3 = "src\\components\\icons\\Email.svelte";

    function create_fragment$4(ctx) {
    	let svg;
    	let g0;
    	let path;
    	let g1;
    	let g2;
    	let g3;
    	let g4;
    	let g5;
    	let g6;
    	let g7;
    	let g8;
    	let g9;
    	let g10;
    	let g11;
    	let g12;
    	let g13;
    	let g14;
    	let g15;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g0 = svg_element("g");
    			path = svg_element("path");
    			g1 = svg_element("g");
    			g2 = svg_element("g");
    			g3 = svg_element("g");
    			g4 = svg_element("g");
    			g5 = svg_element("g");
    			g6 = svg_element("g");
    			g7 = svg_element("g");
    			g8 = svg_element("g");
    			g9 = svg_element("g");
    			g10 = svg_element("g");
    			g11 = svg_element("g");
    			g12 = svg_element("g");
    			g13 = svg_element("g");
    			g14 = svg_element("g");
    			g15 = svg_element("g");
    			attr_dev(path, "d", "M469.075,64.488h-448.2c-10.3,0-18.8,7.5-20.5,17.3c-0.6,2.4-0.3,322.7-0.3,322.7c0,11.4,9.4,20.8,20.8,20.8h447.1\r\n\t\tc11.4,0,20.8-8.3,21.8-19.8v-320.2C489.875,73.788,480.475,64.488,469.075,64.488z M404.275,106.088l-159.8,114.4l-159.8-114.4\r\n\t\tH404.275z M40.675,384.788v-259.9l192.4,137.2c7.8,6.3,17.2,4.4,22.9,0l192.4-137.8v260.5L40.675,384.788L40.675,384.788z");
    			add_location(path, file$3, 3, 1, 238);
    			add_location(g0, file$3, 2, 0, 232);
    			add_location(g1, file$3, 7, 0, 615);
    			add_location(g2, file$3, 9, 0, 626);
    			add_location(g3, file$3, 11, 0, 637);
    			add_location(g4, file$3, 13, 0, 648);
    			add_location(g5, file$3, 15, 0, 659);
    			add_location(g6, file$3, 17, 0, 670);
    			add_location(g7, file$3, 19, 0, 681);
    			add_location(g8, file$3, 21, 0, 692);
    			add_location(g9, file$3, 23, 0, 703);
    			add_location(g10, file$3, 25, 0, 714);
    			add_location(g11, file$3, 27, 0, 725);
    			add_location(g12, file$3, 29, 0, 736);
    			add_location(g13, file$3, 31, 0, 747);
    			add_location(g14, file$3, 33, 0, 758);
    			add_location(g15, file$3, 35, 0, 769);
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "Capa_1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "viewBox", "0 0 489.776 489.776");
    			set_style(svg, "enable-background", "new 0 0 489.776 489.776");
    			attr_dev(svg, "xml:space", "preserve");
    			add_location(svg, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g0);
    			append_dev(g0, path);
    			append_dev(svg, g1);
    			append_dev(svg, g2);
    			append_dev(svg, g3);
    			append_dev(svg, g4);
    			append_dev(svg, g5);
    			append_dev(svg, g6);
    			append_dev(svg, g7);
    			append_dev(svg, g8);
    			append_dev(svg, g9);
    			append_dev(svg, g10);
    			append_dev(svg, g11);
    			append_dev(svg, g12);
    			append_dev(svg, g13);
    			append_dev(svg, g14);
    			append_dev(svg, g15);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Email', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Email> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Email extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Email",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\icons\LinkedIn.svelte generated by Svelte v3.48.0 */

    const file$2 = "src\\components\\icons\\LinkedIn.svelte";

    function create_fragment$3(ctx) {
    	let svg;
    	let rect;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			rect = svg_element("rect");
    			path = svg_element("path");
    			attr_dev(rect, "width", "16");
    			attr_dev(rect, "height", "16");
    			attr_dev(rect, "id", "icon-bound");
    			attr_dev(rect, "fill", "none");
    			add_location(rect, file$2, 1, 2, 121);
    			attr_dev(path, "d", "M14.815,0H1.18C0.53,0,0,0.517,0,1.153v13.694C0,15.485,0.53,16,1.18,16h13.636C15.467,16,16,15.485,16,14.847V1.153 C16,0.517,15.467,0,14.815,0z M4.746,13.634H2.371V5.999h2.376V13.634z M3.559,4.955c-0.762,0-1.377-0.617-1.377-1.377 c0-0.759,0.615-1.376,1.377-1.376c0.759,0,1.376,0.617,1.376,1.376C4.935,4.339,4.319,4.955,3.559,4.955z M13.633,13.634h-2.371 V9.922c0-0.886-0.017-2.025-1.233-2.025c-1.235,0-1.423,0.964-1.423,1.96v3.778H6.235V5.999h2.274v1.043h0.033 c0.317-0.6,1.091-1.233,2.245-1.233c2.401,0,2.845,1.581,2.845,3.638V13.634z");
    			add_location(path, file$2, 2, 2, 184);
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			add_location(svg, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, rect);
    			append_dev(svg, path);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LinkedIn', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LinkedIn> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class LinkedIn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LinkedIn",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Contact.svelte generated by Svelte v3.48.0 */
    const file$1 = "src\\components\\Contact.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let div10;
    	let div0;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let div9;
    	let a0;
    	let div1;
    	let t5;
    	let div8;
    	let a1;
    	let div3;
    	let div2;
    	let github;
    	let t6;
    	let a2;
    	let div5;
    	let div4;
    	let email;
    	let t7;
    	let a3;
    	let div7;
    	let div6;
    	let linkedin;
    	let current;
    	github = new Github({ $$inline: true });
    	email = new Email({ $$inline: true });
    	linkedin = new LinkedIn({ $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			div10 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Get in touch";
    			t1 = space();
    			p = element("p");
    			p.textContent = "I'm looking for internship opportunities for Winter 2023 and Summer 2023. If you think I'm a good fit, shoot me an email! Or if you'd just like to say hi, don't be afraid to reach out!";
    			t3 = space();
    			div9 = element("div");
    			a0 = element("a");
    			div1 = element("div");
    			div1.textContent = "Resume";
    			t5 = space();
    			div8 = element("div");
    			a1 = element("a");
    			div3 = element("div");
    			div2 = element("div");
    			create_component(github.$$.fragment);
    			t6 = space();
    			a2 = element("a");
    			div5 = element("div");
    			div4 = element("div");
    			create_component(email.$$.fragment);
    			t7 = space();
    			a3 = element("a");
    			div7 = element("div");
    			div6 = element("div");
    			create_component(linkedin.$$.fragment);
    			add_location(h2, file$1, 9, 12, 265);
    			attr_dev(p, "class", "desc svelte-fwtvim");
    			add_location(p, file$1, 10, 12, 300);
    			attr_dev(div0, "class", "left svelte-fwtvim");
    			add_location(div0, file$1, 8, 8, 233);
    			attr_dev(div1, "class", "resume svelte-fwtvim");
    			add_location(div1, file$1, 14, 16, 623);
    			attr_dev(a0, "href", "Eah_Raymond.pdf");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-fwtvim");
    			add_location(a0, file$1, 13, 12, 563);
    			attr_dev(div2, "class", "icon svelte-fwtvim");
    			add_location(div2, file$1, 22, 24, 910);
    			attr_dev(div3, "class", "icon-container svelte-fwtvim");
    			add_location(div3, file$1, 21, 20, 856);
    			attr_dev(a1, "href", "https://github.com/raymondeah");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-fwtvim");
    			add_location(a1, file$1, 20, 16, 778);
    			attr_dev(div4, "class", "icon svelte-fwtvim");
    			add_location(div4, file$1, 29, 24, 1211);
    			attr_dev(div5, "class", "icon-container svelte-fwtvim");
    			add_location(div5, file$1, 28, 20, 1157);
    			attr_dev(a2, "href", "mailto:eah.r@northeastern.edu");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-fwtvim");
    			add_location(a2, file$1, 27, 16, 1079);
    			attr_dev(div6, "class", "icon li svelte-fwtvim");
    			add_location(div6, file$1, 36, 24, 1505);
    			attr_dev(div7, "class", "icon-container svelte-fwtvim");
    			add_location(div7, file$1, 35, 20, 1451);
    			attr_dev(a3, "href", "https://linkedin.com/in/raymondeah");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-fwtvim");
    			add_location(a3, file$1, 34, 16, 1368);
    			attr_dev(div8, "class", "icons svelte-fwtvim");
    			add_location(div8, file$1, 19, 12, 741);
    			attr_dev(div9, "class", "right svelte-fwtvim");
    			add_location(div9, file$1, 12, 8, 530);
    			attr_dev(div10, "class", "container svelte-fwtvim");
    			add_location(div10, file$1, 7, 4, 200);
    			attr_dev(section, "id", "contact");
    			attr_dev(section, "class", "svelte-fwtvim");
    			add_location(section, file$1, 6, 0, 172);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div10);
    			append_dev(div10, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div10, t3);
    			append_dev(div10, div9);
    			append_dev(div9, a0);
    			append_dev(a0, div1);
    			append_dev(div9, t5);
    			append_dev(div9, div8);
    			append_dev(div8, a1);
    			append_dev(a1, div3);
    			append_dev(div3, div2);
    			mount_component(github, div2, null);
    			append_dev(div8, t6);
    			append_dev(div8, a2);
    			append_dev(a2, div5);
    			append_dev(div5, div4);
    			mount_component(email, div4, null);
    			append_dev(div8, t7);
    			append_dev(div8, a3);
    			append_dev(a3, div7);
    			append_dev(div7, div6);
    			mount_component(linkedin, div6, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(github.$$.fragment, local);
    			transition_in(email.$$.fragment, local);
    			transition_in(linkedin.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(github.$$.fragment, local);
    			transition_out(email.$$.fragment, local);
    			transition_out(linkedin.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(github);
    			destroy_component(email);
    			destroy_component(linkedin);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Email, Github, LinkedIn });
    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\Footer.svelte generated by Svelte v3.48.0 */

    const file = "src\\components\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			section = element("section");
    			p = element("p");
    			p.textContent = "Built with Svelte by Raymond Eah";
    			add_location(p, file, 1, 4, 15);
    			attr_dev(section, "class", "svelte-ik6zaa");
    			add_location(section, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.48.0 */

    function create_fragment(ctx) {
    	let landing;
    	let t0;
    	let about;
    	let t1;
    	let rumble;
    	let t2;
    	let contact;
    	let t3;
    	let footer;
    	let current;
    	landing = new Landing({ $$inline: true });
    	about = new About({ $$inline: true });
    	rumble = new Rumble({ $$inline: true });
    	contact = new Contact({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(landing.$$.fragment);
    			t0 = space();
    			create_component(about.$$.fragment);
    			t1 = space();
    			create_component(rumble.$$.fragment);
    			t2 = space();
    			create_component(contact.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(landing, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(about, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(rumble, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(contact, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(landing.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(rumble.$$.fragment, local);
    			transition_in(contact.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(landing.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(rumble.$$.fragment, local);
    			transition_out(contact.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(landing, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(about, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(rumble, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(contact, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Landing, About, Rumble, Contact, Footer });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
