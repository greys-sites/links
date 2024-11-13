import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

import Tokens from '$lib/data/tokens';

export function load({ cookies }) {
	var u = cookies.get('user');
	if(u) throw redirect(308, '/dash');
}

export const actions = {
	login: async ({ cookies, request }) => {
		var d = await request.formData();
		var tk = d.get('token');

		try {
			var u = Tokens.get(tk);

			if(u?.id) {
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