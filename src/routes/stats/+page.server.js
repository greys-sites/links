import { redirect, fail } from '@sveltejs/kit';
import { subDays, eachDayOfInterval } from 'date-fns';

export async function load({ locals, cookies, fetch, url }) {
	if(!locals.verified) {
		redirect(308, '/login');
	}
	var u = cookies.get('user');

	let today = new Date();
	var query = {
		from: url.searchParams.get('from') ?? subDays(today, 30),
		to: url.searchParams.get('to') ?? today,
	}

	let days = eachDayOfInterval({
		start: query.from,
		end: query.to
	})
	days = days.map((d) => d.toISOString());
	
	var params = new URLSearchParams();
	params.set('from', query.from);
	params.set('to', query.to);

	var stats = [];
	var links = [];

	var d;
	try {
		var r = await fetch(`/api/stats?${params.toString()}`, {
			headers: {
				'Authorization': u
			}
		})
		if(r) stats = await r.json();

		r = await fetch(`/api/links`, {
			headers: {
				'Authorization': u
			}
		})
		if(r) links = await r.json();
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

	console.log(links);

	let arranged = [];
	for(var link of links) {
		if(Array.isArray(link.stats)) link.stats = {
			count: 0,
			dates: []
		}

		let mapped = [];
		for(var day of days) {
			mapped.push(link.stats.dates[day] ?? 0)
		}

		arranged.push({
			...link,
			stats: mapped
		})
	}

	return { stats, links: arranged };
}