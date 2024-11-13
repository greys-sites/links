import { error, json } from '@sveltejs/kit';

import Links from '$lib/data/links';

export async function PATCH({ request, params, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");
	var link = await Links.get(params.hid);
	if(!link) return error(404, "Link not found.");

	var fd = await request.json();
	var name = fd.name ?? link.name;
	var hid = fd.hid ?? link.hid;
	var url = fd.url ?? link.url;

	link.name = name;
	link.hid = hid;
	link.url = url;

	await link.save();

	return json(link);
}

export async function GET({ params, locals }) {
	if(!locals?.verified) return [];

	var link = await Links.get(params.hid);
	if(!link) return error(404, "Link not found.");

	return json(link);
}

export async function DELETE({ request, params, locals }) {
	if(!locals?.verified) return json({});

	var link = await Links.get(params.hid);
	if(!link) return error(404, "Link not found.");

	await link.delete();

	return json({ hid: params.hid });
}