import { NextResponse } from 'next/server';

export async function GET(request) {
	const params = request.nextUrl.searchParams;
	const code = params.get('code');

	if (!code) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	const url =
		process.env.NODE_ENV === 'production'
			? 'http://daewoo.digital:9980'
			: 'http://localhost:33000';

	const response = await fetch(`${url}/api/v1/employees/oauth/kakao`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});
	console.log('>>> response ', response);
	const data = await response.text();
	console.log('>>> data ', data);

	if (!response.ok) {
		return NextResponse.redirect(new URL(url, request.url));
	}

	return NextResponse.redirect(new URL(url, request.url));
}
