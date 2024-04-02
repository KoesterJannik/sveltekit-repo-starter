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
	]
};
