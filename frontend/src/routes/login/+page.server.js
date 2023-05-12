import { fail } from '@sveltejs/kit';
import * as axios from 'axios';
import { API } from '$env/static/private';

export const actions = {
	default: async ({ cookies, req }) => {
		var d = await req.formData();

		try {
			axios.get(API + '/users', {
				headers: {
					'Authorization': d.get('token')
				}
			})
		} catch(e) {
			return fail(401, {
				error: "Token is incorrect."
			});
		}
	}
}