import { c as create_ssr_component, a as subscribe, e as each, v as validate_component, b as escape, n as null_to_empty } from './index3-0ebedea9.js';
import { t as toasts } from './toasts-b8e4ef40.js';
import './index2-c7c2406d.js';

/* empty css                                                */const css$1 = {
  code: "div.svelte-1o88o33.svelte-1o88o33{color:#eee;border-radius:.5rem;text-align:left;margin:auto;margin-top:10px;width:18rem;padding:.5rem;display:flex;flex-direction:row;align-items:center;justify-content:space-between;position:relative}.close.svelte-1o88o33.svelte-1o88o33{font-weight:bold;color:white;padding:.5rem .7rem}div.svelte-1o88o33>p.svelte-1o88o33{margin:0}.success.svelte-1o88o33.svelte-1o88o33{background-color:#55aa55}.error.svelte-1o88o33.svelte-1o88o33{background-color:#aa5555}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { props = {
    id: 0,
    type: "success",
    canClose: true,
    timeout: 5e3,
    message: "This is a toast :)"
  } } = $$props;
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  $$result.css.add(css$1);
  return `<div class="${escape(null_to_empty(props.type), true) + " svelte-1o88o33"}"><p class="svelte-1o88o33">${escape(props.message)}</p>
${props.canClose ? `<button class="close svelte-1o88o33">X</button>` : ``}
</div>`;
});
const css = {
  code: "nav.svelte-2lkd6w.svelte-2lkd6w{background-color:rgba(255, 255, 255, .07);width:100%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding-left:.5rem;margin:0;position:sticky;top:0;left:0}nav.svelte-2lkd6w>.svelte-2lkd6w{margin-right:.5rem}.toasts.svelte-2lkd6w.svelte-2lkd6w{position:fixed;top:0;right:0;width:18rem;display:flex;flex-direction:column-reverse;align-items:center;justify-content:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  $$result.css.add(css);
  $$unsubscribe_toasts();
  return `<nav class="svelte-2lkd6w"><a href="/" class="svelte-2lkd6w">home</a>
	<p class="svelte-2lkd6w">|</p>
	<a href="/links" class="svelte-2lkd6w">links</a>
	<p class="svelte-2lkd6w">|</p>
	<a href="/dash" class="svelte-2lkd6w">dash</a></nav>

<div class="toasts svelte-2lkd6w">${each($toasts, (t) => {
    return `${validate_component(Toast, "Toast").$$render($$result, { props: t }, {}, {})}`;
  })}</div>

${slots.default ? slots.default({}) : ``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-6335ee6b.js.map
