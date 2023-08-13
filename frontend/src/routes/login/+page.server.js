import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import axios from 'axios';
import { API } from '$env/static/private';

console.log(API);

export function load({ cookies }) {
	var u = cookies.get('user');
	if(u) throw redirect(308, '/dash');
}

export const actions = {
	login: async ({ cookies, request }) => {
		console.log(request)
		var d = await request.formData();
		console.log(d);
		var tk = d.get('token');

		try {
			var u = await axios.get(API + '/users', {
				headers: {
					'Authorization': tk
				}
			});

			if(u) {
				cookies.set('user', tk);
			} else return fail(401, {
				error: "Token is incorrect."
			});
		} catch(e) {
			console.log(e);
			return fail(401, {
				success: false,
				status: 401,
				message: "Token is incorrect."
			});
		}
	}
}