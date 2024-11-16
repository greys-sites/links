import { redirect, fail } from '@sveltejs/kit';

export async function load({ locals, cookies, fetch }) {
	return { verified: locals.verified };
}