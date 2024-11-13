import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

import Tokens from '$lib/data/tokens';

export async function load({ cookies, locals }) {
	if(locals.verified) redirect(308, '/dash');
	else {
		cookies.delete('user', { path: '/' });
	}
}

export const actions = {
	login: async ({ cookies, request }) => {
		var d = await request.formData();
		var tk = d.get('token');

		try {
			var u = await Tokens.get(tk);
			console.log(u);

			if(u?.id) {
				cookies.set('user', tk, { path: '/' });
				return {
					success: true
				}
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