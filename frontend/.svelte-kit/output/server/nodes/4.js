import * as server from '../entries/pages/dash/_page.server.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/dash/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dash/+page.server.js";
export const imports = ["_app/immutable/nodes/4.24ddd245.js","_app/immutable/chunks/index.9c9e698c.js","_app/immutable/chunks/toasts.25852f94.js","_app/immutable/chunks/index.a7151f55.js","_app/immutable/chunks/forms.58d63d22.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.b7483f1b.js"];
export const stylesheets = ["_app/immutable/assets/4.b6e837e7.css","_app/immutable/assets/toast.b81c833d.css"];
export const fonts = [];
