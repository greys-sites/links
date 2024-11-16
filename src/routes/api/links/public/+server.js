import { error, json } from '@sveltejs/kit';

import Links from '$lib/data/links';
import Stats from '$lib/data/stats';

export async function GET({ request, locals }) {
	var links = await Links.getAll();
	var stats = await Stats.getAll();

	links = links.filter(l => l.visible == true);
	for(var link of links) {
		link.stats = stats[link.hid] ?? [];
	}

	return json(links);
}