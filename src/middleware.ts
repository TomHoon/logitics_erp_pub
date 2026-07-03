import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('accessToken')?.value;

	const { pathname } = request.nextUrl;

	// 로그인 페이지는 통과
	if (pathname === '/' || pathname === '/oauth/kakao') {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL('/', request.url));
	} else {
		return NextResponse.next();
	}
}

// export const config = {
// 	matcher: ['/mypage/:path*', '/payment/:path*'],
// };
export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)'],
};
