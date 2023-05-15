import { redirect, fail } from '@sveltejs/kit';
import axios from 'axios';
import { API } from '$env/static/private';

export async function load({ cookies }) {
	var u = cookies.get('user');
	if(!u) throw redirect(308, '/login');

	var d;
	try {
		d = await axios.get(API + '/links', {
			headers: {
				'Authorization': u
			}
		})
		d = d.data;
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
	async create({ cookies, request }) {
		var u = cookies.get('user');
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
			var resp = await axios.post(`${API}/links`, data, {
				headers: {
					'Authorization': u
				}
			})

			resp = resp.data;
		} catch(e) {
			console.log(e);
			return fail(500, {
				// success: false,
				action: 'create',
				status: e.response?.status ?? 500,
				message: e.response?.data || "Internal error"
			})
		}

		return { success: true, action: 'create', data: resp };
	},

	async del({ cookies, request }) {
		var u = cookies.get('user');
		var d = await request.formData();
		try {
			var resp = await axios.delete(API + `/links/${d.get('hid')}`, {
				headers: {
					'Authorization': u
				}
			})
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

		return { success: true, action: 'delete', data: d.get('hid')};
	}
}