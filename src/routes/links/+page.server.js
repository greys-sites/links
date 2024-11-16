import { redirect, fail } from '@sveltejs/kit';

export async function load({ locals, cookies, fetch }) {
	var links = [];

	var d;
	try {
		var r = await fetch('/api/links/public')
		if(r) links = await r.json();
	} catch(e) {
		console.log(e.response ?? e);
		switch(e.response?.status) {
			case 401:
			case 404:
				d = null;
				break;
			default:
				d = null;
				break;
		}
	}

	return { links };
}