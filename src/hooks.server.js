import Tokens from '$lib/data/tokens';

export async function handle({ event, resolve }) {
	var tk = event.cookies.get('user');
	if(!tk) tk = event.request.headers.get('authorization');

	var grabbed = await Tokens.get(tk);

	event.locals.verified = (
		grabbed?.id ?
		true :
		false
	)

	const response = await resolve(event);
	return response;
}