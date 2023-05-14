import { writable } from 'svelte/store';

const toasts = writeable([]);

export const dismiss = (id) => {
	toasts.update(ts => ts.filter(t => t.id != id));
}

export const add = (data = {
	timeout: 5000,
	canClose: true,
	message: "This is a toast :)",
	type: "success"
}) => {
	const id = Math.floor(Math.random() * 1000));

	toasts.update(ts => ts.push({ id, ...data }))
	if(data.timeout) setTimeout(() => dismiss(id), data.timeout);
}