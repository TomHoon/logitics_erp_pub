import { NextResponse } from 'next/server';

export async function GET(request) {
	const params = request.nextUrl.searchParams;
	const code = params.get('code');

	console.log('code >> ', code);

	if (!code) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	const url = process.env.SPRING_API_URL;

	const response = await fetch(`${url}/api/v1/employees/oauth/kakao`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});

	console.log('response >> ', response);
	if (!response.ok) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.redirect(new URL('/info/register', request.url));
}
