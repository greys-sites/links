import { error, redirect } from '@sveltejs/kit';

import Links from '$lib/data/links';

export async function load({ cookies, params }) {
	var hid = params.hid;

	try {
		var link = await Links.get(hid);
		var req = link;
	} catch(e) {
		console.log(e.response?.data ?? e);
		error(e.response?.status ?? 500, {
			message: e.response?.data ?? "Internal error."
		});
	}

	console.log(req);
	if(req?.url) redirect(308, req.url);
	else error(404, "Link not found.");
}