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

	const frontUrl =
		process.env.NODE_ENV === 'production'
			? 'http://daewoo.digital:9980'
			: 'http://localhost:3000';


	const response = await fetch(`${url}/api/v1/employees/oauth/kakao`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ code }),
	});
	console.log('>>> response ', response);
	const data = await response.json();
	console.log('>>> data ', data);

	if (!response.ok) {
		return NextResponse.redirect(new URL(frontUrl, request.url));
	}

	// 기가입자인 경우
	if (data?.data?.accessToken) {
		const response = NextResponse.redirect(
			new URL(`${frontUrl}?socialSuccess=1`, request.url)
		);


		/* 		response.cookies.set("accessToken", data.data.accessToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "lax",
					path: "/",
				}); */

		response.cookies.set("accessToken", data.data.accessToken);
		response.cookies.set("user", JSON.stringify(data?.data));

		return response;
	}

	return NextResponse.redirect(new URL(`${frontUrl}?providerToken=${data?.data?.providerToken}`, request.url));
}
