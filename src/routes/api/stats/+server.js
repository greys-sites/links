import { error, json } from '@sveltejs/kit';

import Stats from '$lib/data/stats';

export async function POST({ request, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var fd = await request.json();
	var lid = fd.lid;

	var created = await Stats.create({
		lid
	});

	return json({ created });
}

export async function GET({ request, locals }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var stats = await Stats.getAll();

	return json(stats);
}