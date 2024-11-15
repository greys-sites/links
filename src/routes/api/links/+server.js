import { error, json } from '@sveltejs/kit';

import Links from '$lib/data/links';
import Stats from '$lib/data/stats';

export async function POST({ request, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var fd = await request.json();
	var url = fd.url;
	var hid = fd.hid?.length ? fd.hid :  null;
	var name = fd.name;
	var description = fd.description;
	var visible = fd.visible == "public" ? true : false;

	var created = await Links.create({
		url,
		name,
		hid,
		description,
		visible
	});

	return json({ created });
}

export async function GET({ request, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var links = await Links.getAll();
	var stats = await Stats.getAll();

	for(var link of links) {
		link.stats = stats[link.hid] ?? [];
	}

	return json(links);
}