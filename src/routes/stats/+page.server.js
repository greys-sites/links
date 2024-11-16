import { redirect, fail } from '@sveltejs/kit';

import { subDays, addDays, eachDayOfInterval } from 'date-fns';
import { formatDate } from '$lib/utils';

export async function load({ locals, cookies, fetch }) {
	if(!locals.verified) {
		redirect(308, '/login');
	}
	var u = cookies.get('user');

	var stats = [];

	var d;
	try {
		var r = await fetch('/api/stats', {
			headers: {
				'Authorization': u
			}
		})
		if(r) stats = await r.json();
	} catch(e) {
		console.log(e.response ?? e);
		switch(e.response?.status) {
			case 401:
			case 404:
				cookies.delete('user', { path: "/" });
				d = null;
				break;
			default:
				d = null;
				break;
		}
	}

	console.log(stats);

	var mapped = new Map();
	var total = 0;

	for(let set in stats) {
		let st = stats[set];
		total += st.count;
		
		let dates = Object.keys(st.dates);
		for(var date of dates) {
			let entry = mapped.get(date)
			if(entry) {
				entry.count += st.dates[date];
				entry.links.add(set);
			} else mapped.set(date, {
				count: st.dates[date],
				links: new Set([set])
			})
		}
	}

	let today = new Date();
	let days = eachDayOfInterval({
		start: subDays(today, 30),
		end: today
	})
	days = days.map(d => d.toISOString());
	console.log(days);
	let arranged = [];
	for(var d of days) {
		let data = mapped.get(d);
		arranged.push({
			date: d,
			count: data?.count ?? 0,
			links: data?.links ? Array.from(data.links) : []
		})
			
	}

	console.log(arranged);

	return { stats, arranged };
}