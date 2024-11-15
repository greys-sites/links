import { redirect, fail } from '@sveltejs/kit';
import Links from '$lib/data/links';
import Tokens from '$lib/data/tokens';

export async function load({ locals, cookies, fetch }) {
	if(!locals.verified) {
		redirect(308, '/login');
	}
	var u = cookies.get('user');

	var links = [];

	var d;
	try {
		var r = await fetch('/api/links', {
			headers: {
				'Authorization': u
			}
		})
		if(r) links = await r.json();
	} catch(e) {
		console.log(e.response ?? e);
		switch(e.response?.status) {
			case 401:
			case 404:
				cookies.delete('user', { path: "/" });
				d = null;
				break;
			default:
				d = null;
				break;
		}
	}

	return { links };
}

export const actions = {
	async create({ cookies, request, locals, fetch }) {
		if(!locals.verified) return fail(401, {
			success: false,
			action: 'create',
			status: 400,
			message: 'Unauthorized.'
		});

		var u = cookies.get('user');
		var d = await request.formData();
		var data = {
			name: d.get('name'),
			'url': d.get('url'),
			hid: d.get('hid') ?? null,
			description: d.get('description'),
			visible: d.get('visible')
		}

		if(!data.name) return fail(400, {
			success: false,
			action: 'create',
			status: 400,
			message: "Link name is required."
		});

		if(!data.url) return fail(400, {
			success: false,
			action: 'create',
			status: 400,
			message: "Link URL is required."
		});
		
		try {
			var created = await fetch(`/api/links`, {
				headers: {
					'Authorization': u,
				},
				body: JSON.stringify(data),
				method: 'POST'
			})

			if(created) created = await created.json();
		} catch(e) {
			console.log(e);
			return fail(500, {
				success: false,
				action: 'create',
				status: e.response?.status ?? 500,
				message: e.response?.data || "Internal error"
			})
		}

		return { success: true, action: 'create', data: created };
	},

	async edit({ cookies, request, locals, fetch }) {
		if(!locals.verified) return fail(401, {
			success: false,
			action: 'create',
			status: 400,
			message: 'Unauthorized.'
		});

		var u = cookies.get('user');
		var d = await request.formData();
		var hid = d.get('oldhid');

		console.log(d.get('visible'));

		try {
			var req = await fetch(`/api/links/${hid}`, {
				headers: {
					'Authorization': u
				},
				body: d,
				method: 'PATCH'
			})

			if(req) req = await req.json();
		} catch(e) {
			console.log(e);
			return fail(500, {
				success: false,
				action: 'create',
				status: e.response?.status ?? 500,
				message: e.response?.data || "Internal error"
			})
		}

		return { success: true, action: 'edit', data: req };
	},

	async del({ cookies, request, locals, fetch }) {
		if(!locals.verified) return fail(401, {
			success: false,
			action: 'create',
			status: 400,
			message: 'Unauthorized.'
		});

		var u = cookies.get('user');
		var d = await request.formData();
		var hid = d.get('hid');

		try {
			var req = await fetch(`/api/links/${hid}`, {
				headers: {
					'Authorization': u
				},
				method: 'DELETE'
			})

			if(req) req = await req.json();
		} catch(e) {
			console.log(e);
			return fail(500, {
				success: false,
				action: 'create',
				status: 500,
				message: "Internal error"
			})
		}

		return { success: true, action: 'delete', data: hid };
	}
}