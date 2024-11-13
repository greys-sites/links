import { error, json } from '@sveltejs/kit';

import Links from '$lib/data/links';
import Stats from '$lib/data/stats';

export async function POST({ request, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var fd = await request.json();
	var url = fd.url;
	var hid = fd.hid;
	var name = fd.name;

	var created = await Links.create({
		url,
		name,
		hid
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