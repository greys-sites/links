import { w as writable } from "./index2.js";
const toasts = writable([]);
const dismiss = (id) => {
  toasts.update((ts) => {
    console.log(ts);
    return ts.filter((t) => t.id != id);
  });
};
const add = (data = {
  timeout: 5e3,
  canClose: true,
  message: "This is a toast :)",
  type: "success"
}) => {
  const id = Math.floor(Math.random() * 1e3);
  toasts.update((ts) => {
    console.log(ts);
    return [...ts, { id, ...data }];
  });
  if (data.timeout)
    setTimeout(() => dismiss(id), data.timeout);
};
export {
  add as a,
  toasts as t
};
