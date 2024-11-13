import Tokens from '$lib/data/tokens';

export async function handle({ event, resolve }) {
	var tk = event.cookies.get('user');
	if(!tk) tk = event.request.headers.get('authorization');

	var grabbed = Tokens.get(tk);
	if(grabbed?.id) event.locals.verified = true;
	const response = await resolve(event);
	return response;
}