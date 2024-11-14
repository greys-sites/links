import { r as redirect, f as fail } from "../../../chunks/index.js";
import "../../../chunks/singletons.js";
import axios from "axios";
import { A as API } from "../../../chunks/private.js";
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
export {
  actions,
  load
};
