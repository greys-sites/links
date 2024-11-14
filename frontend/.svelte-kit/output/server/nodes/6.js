import * as server from '../entries/pages/login/_page.server.js';

export const index = 6;
export const component = async () => (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.js";
export const imports = ["_app/immutable/nodes/6.2c14e8a8.js","_app/immutable/chunks/index.9c9e698c.js","_app/immutable/chunks/toasts.25852f94.js","_app/immutable/chunks/index.a7151f55.js","_app/immutable/chunks/forms.58d63d22.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.b7483f1b.js"];
export const stylesheets = [];
export const fonts = [];
