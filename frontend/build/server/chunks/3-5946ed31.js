import { e as error, r as redirect } from './index-39e97e00.js';
import axios from 'axios';
import { A as API } from './private-6e8140bb.js';

async function load({ cookies, params }) {
  var hid = params.hid;
  try {
    var req = await axios.get(`${API}/links/${hid}`);
    req = req.data;
  } catch (e) {
    console.log(e.response?.data ?? e);
    throw error(e.response?.status ?? 500, {
      message: e.response?.data ?? "Internal error."
    });
  }
  console.log(req);
  if (req?.url)
    throw redirect(308, req.url);
  else
    throw error(404, "Link not found");
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
const server_id = "src/routes/[hid]/+page.server.js";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-5946ed31.js.map
