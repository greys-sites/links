import { error, redirect } from '@sveltejs/kit';

import Links from '$lib/data/links';

export async function load({ cookies, params, fetch }) {
	var u = cookies.get('user');
	var hid = params.hid;

	try {
		var link = await fetch(`/api/links/${hid}`, {
			headers: {
				'Authorization': u
			}
		});

		if(link) var req = await link.json();

		await fetch(`/api/stats`, {
			headers: {
				'Authorization': u
			},
			body: JSON.stringify({ lid: hid }),
			method: 'POST'
		})
	} catch(e) {
		console.log(e.response?.data ?? e);
		error(e.response?.status ?? 500, {
			message: e.response?.data ?? "Internal error."
		});
	}

	if(req?.url) redirect(308, req.url);
	else error(404, "Link not found.");
}