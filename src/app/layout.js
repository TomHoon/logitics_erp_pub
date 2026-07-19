import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: '물류시스템 인사관리',
	description: '물류시스템 인사관리 페이지입니다.',
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				{children}
				<Script
					src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
					strategy="lazyOnload"
				/>
				<Script
					src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js"
					integrity="sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J"
					crossorigin="anonymous"
				/>

				<Toaster />
			</body>
		</html>
	);
}
