import { redirect, fail } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
	if(!locals.verified) {
		cookies.delete('user', { path: "/" });
		throw redirect(308, '/login');
	}

	var d;
	try {
		d = await Links.getAll();
	} catch(e) {
		console.log(e.response ?? e);
		switch(e.response?.status) {
			case 401:
				cookies.delete('user');
				d = { links: [] };
				break;
			default:
				d = { links: [] };
				break;
		}
	}

	return { links: d };
}

export const actions = {
	async create({ cookies, request, locals }) {
		if(!locals.verified) return fail(401, {
			success: false,
			action: 'create',
			status: 400,
			message: 'Unauthorized.'
		});

		var d = await request.formData();
		var data = {
			name: d.get('name'),
			'url': d.get('url'),
			hid: d.get('hid') ?? null
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
			var created = Links.create(data)
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

	async del({ cookies, request }) {
		if(!locals.verified) return fail(401, {
			success: false,
			action: 'create',
			status: 400,
			message: 'Unauthorized.'
		});

		var d = await request.formData();
		var hid = d.get('hid');

		try {
			var link = await Links.get(hid);
			if(link?.id) await link.delete();
		} catch(e) {
			console.log(e);
			return {
				success: false,
				action: 'delete',
				data: {
					status: e.response.status,
					message: e.response.data
				}
			}
		}

		return { success: true, action: 'delete', data: hid };
	}
}