import { redirect } from '@sveltejs/kit';
import * as axios from 'axios';
import { API } from '$env/static/private';

export async function load({ cookies }) {
	var u = cookies.get('user');
	console.log(u)
	if(!u) throw redirect(308, '/login');

	var d = await axios.get(API + '/links', {
		headers: {
			'Authorization': u
		}
	})

	console.log(d);
	return d;
}