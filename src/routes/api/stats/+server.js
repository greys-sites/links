import { error, json } from '@sveltejs/kit';
import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { formatDate } from '$lib/utils';

import Stats from '$lib/data/stats';

export async function POST({ request, locals }) {
	// if(!locals?.verified) return error(401, "Unauthorized.");

	var fd = await request.json();
	var lid = fd.lid;

	var created = await Stats.create({
		lid
	});

	return json({ created });
}

export async function GET({ request, locals, url: { searchParams } }) {
	if(!locals?.verified) return error(401, "Unauthorized.");

	var query = {
		from: new Date(searchParams.get('from')),
		to: new Date(searchParams.get('to'))
	}
	var stats;
	if(!isNaN(query.from) && !isNaN(query.to)) {
		stats = await Stats.getBetween(query.from, query.to);

		let days = eachDayOfInterval({
			start: query.from,
			end: query.to
		})
		days = days.map(d => d.toISOString());

		var mapped = new Map();
		var total = 0;

		let arranged = [];

		for(let st of stats) {
			total += 1;

			let date = st.date.toISOString();
			let entry = mapped.get(date)
			if(entry) {
				entry.count += 1;
			} else mapped.set(date, {
				count: 1,
			})
		}

		for(var d of days) {
			let data = mapped.get(d);
			arranged.push({
				date: d,
				count: data?.count ?? 0,
			})
		}

		return json(arranged)
	} else stats = await Stats.getAll();

	return json(stats);
}