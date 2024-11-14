import { c as create_ssr_component, e as each, b as escape, d as add_attribute } from './index3-0ebedea9.js';
import { a as add } from './toasts-b8e4ef40.js';
import './utils-ae3035df.js';
import './index2-c7c2406d.js';

const css = {
  code: ".link.svelte-10uyn75.svelte-10uyn75{width:90%;display:flex;flex-direction:row;align-items:center;justify-content:space-between;background-color:rgba(255, 255, 255, .09);border-radius:.5rem;color:black;margin:.7rem;padding:.5rem}.link.svelte-10uyn75 form.svelte-10uyn75{width:unset}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let { data } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  {
    console.log(form);
  }
  {
    if (form) {
      switch (form.success) {
        case true:
          add({
            type: "success",
            message: `Link ${form.action}d!`,
            timeout: 5e3,
            canClose: true
          });
          break;
        case false:
          add({
            type: "error",
            message: `Error: ${form.message}`,
            timeout: 5e3,
            canClose: true
          });
          break;
      }
    }
  }
  return `<div class="container"><form method="POST" action="?/create"><input type="text" placeholder="name" name="name">
    <input type="text" placeholder="url" name="url">
    <input type="text" placeholder="custom ID" name="hid">
    <input type="submit" value="submit"></form>
  ${each(data.links, (d) => {
    return `<div class="link svelte-10uyn75"><a href="${"/" + escape(d.hid, true)}" target="_blank">${escape(d.hid)}</a>
      <a${add_attribute("href", d.url, 0)} target="_blank">${escape(d.name)}</a>
    	<form method="POST" action="?/del" class="svelte-10uyn75"><input type="text"${add_attribute("value", d.hid, 0)} name="hid" hidden>
	    	<input type="submit" value="delete"></form>
    </div>`;
  })}
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-2bb5b381.js.map
