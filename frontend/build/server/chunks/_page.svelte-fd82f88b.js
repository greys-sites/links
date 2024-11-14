import { c as create_ssr_component } from './index3-0ebedea9.js';
import { a as add } from './toasts-b8e4ef40.js';
import './utils-ae3035df.js';
import './index2-c7c2406d.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  {
    console.log(form);
  }
  {
    if (form) {
      switch (form.success) {
        case false:
          add({
            type: "error",
            message: `${form.status}: ${form.message}`,
            timeout: 5e3,
            canClose: true
          });
          break;
      }
    }
  }
  return `<div class="container"><form method="POST" action="?/login"><input type="text" placeholder="token" name="token">
	<input type="submit" value="submit"></form></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-fd82f88b.js.map
