import { r as redirect, f as fail } from './index-39e97e00.js';
import axios from 'axios';
import { A as API } from './private-6e8140bb.js';

console.log(API);
function load({ cookies }) {
  var u = cookies.get("user");
  if (u)
    throw redirect(308, "/dash");
}
const actions = {
  login: async ({ cookies, request }) => {
    console.log(request);
    var d = await request.formData();
    console.log(d);
    var tk = d.get("token");
    try {
      var u = await axios.get(API + "/users", {
        headers: {
          "Authorization": tk
        }
      });
      if (u) {
        cookies.set("user", tk);
      } else
        return fail(401, {
          error: "Token is incorrect."
        });
    } catch (e) {
      console.log(e);
      return fail(401, {
        success: false,
        status: 401,
        message: "Token is incorrect."
      });
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
const component = async () => (await import('./_page.svelte-fd82f88b.js')).default;
const server_id = "src/routes/login/+page.server.js";
const imports = ["_app/immutable/nodes/6.2c14e8a8.js","_app/immutable/chunks/index.9c9e698c.js","_app/immutable/chunks/toasts.25852f94.js","_app/immutable/chunks/index.a7151f55.js","_app/immutable/chunks/forms.58d63d22.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.b7483f1b.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-e5ae86c0.js.map
