import { r as redirect, f as fail } from './index-39e97e00.js';
import axios from 'axios';
import { A as API } from './private-6e8140bb.js';

async function load({ cookies }) {
  var u = cookies.get("user");
  if (!u)
    throw redirect(308, "/login");
  var d;
  try {
    d = await axios.get(API + "/links", {
      headers: {
        "Authorization": u
      }
    });
    d = d.data;
  } catch (e) {
    console.log(e.response ?? e);
    switch (e.response?.status) {
      case 401:
        cookies.delete("user");
        d = { links: [] };
        break;
      default:
        d = { links: [] };
        break;
    }
  }
  return { links: d };
}
const actions = {
  async create({ cookies, request }) {
    var u = cookies.get("user");
    var d = await request.formData();
    var data = {
      name: d.get("name"),
      "url": d.get("url"),
      hid: d.get("hid") ?? null
    };
    if (!data.name)
      return fail(400, {
        success: false,
        action: "create",
        status: 400,
        message: "Link name is required."
      });
    if (!data.url)
      return fail(400, {
        success: false,
        action: "create",
        status: 400,
        message: "Link URL is required."
      });
    try {
      var resp = await axios.post(`${API}/links`, data, {
        headers: {
          "Authorization": u
        }
      });
      resp = resp.data;
    } catch (e) {
      console.log(e);
      return fail(500, {
        // success: false,
        action: "create",
        status: e.response?.status ?? 500,
        message: e.response?.data || "Internal error"
      });
    }
    return { success: true, action: "create", data: resp };
  },
  async del({ cookies, request }) {
    var u = cookies.get("user");
    var d = await request.formData();
    try {
      var resp = await axios.delete(API + `/links/${d.get("hid")}`, {
        headers: {
          "Authorization": u
        }
      });
    } catch (e) {
      console.log(e);
      return {
        success: false,
        action: "delete",
        data: {
          status: e.response.status,
          message: e.response.data
        }
      };
    }
    return { success: true, action: "delete", data: d.get("hid") };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-2bb5b381.js')).default;
const server_id = "src/routes/dash/+page.server.js";
const imports = ["_app/immutable/nodes/4.24ddd245.js","_app/immutable/chunks/index.9c9e698c.js","_app/immutable/chunks/toasts.25852f94.js","_app/immutable/chunks/index.a7151f55.js","_app/immutable/chunks/forms.58d63d22.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.b7483f1b.js"];
const stylesheets = ["_app/immutable/assets/4.b6e837e7.css","_app/immutable/assets/toast.b81c833d.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-5b1fe1d0.js.map
