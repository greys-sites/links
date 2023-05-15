import { error, redirect } from '@sveltejs/kit';
import axios from 'axios';
import { API } from '$env/static/private';

export async function load({ cookies, params }) {
	var hid = params.hid;

	try {
		var req = await axios.get(`${API}/links/${hid}`);
		req = req.data;
	} catch(e) {
		console.log(e.response?.data ?? e);
		throw error(e.response?.status ?? 500, {
			message: e.response?.data ?? "Internal error."
		})
	}

	console.log(req);
	if(req?.url) throw redirect(308, req.url);
	else throw error(404, "Link not found");
}