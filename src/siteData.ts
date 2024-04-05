import Home from 'lucide-svelte/icons/home';

import Package2 from 'lucide-svelte/icons/package-2';

export const siteData = {
	appShellTitle: 'Starter Template',
	dashboardLinks: [
		{
			name: 'Dashboard',
			icon: Home,
			href: '/protected/dashboard',
			needsRole: 'USER'
		},
		{
			name: 'Store',
			icon: Home,
			href: '/protected/store',
			needsRole: 'USER'
		},
		{
			name: 'Your Products',
			icon: Home,
			href: '/protected/bought-products',
			needsRole: 'USER'
		},
		{
			name: 'Another Page',
			icon: Package2,
			href: '/protected/another-page',
			needsRole: 'USER'
		},
		{
			name: 'Admin only area',
			icon: Package2,
			href: '/protected/admin/overview',
			needsRole: 'ADMIN'
		}
	],
	landingLinks: [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Login',
			href: '/signin'
		},
		{
			name: 'Register',
			href: '/signup'
		}
	],
	landingHeaderTitle: 'Starter Template',
	landingHeaderIconUrl: '/favicon.png',
	landingFooterIconUrl: '/favicon.png',
	footerLinks: {
		legal: [
			{
				name: 'Privacy Policy',
				href: '/privacy-policy'
			},
			{
				name: 'Terms of Service',
				href: '/terms-of-service'
			},
			{
				name: 'Data Protection',
				href: '/data-protection'
			}
		]
	},
	copyRightFooter: {
		text: '&copy; 2024, your company name'
	}
};
