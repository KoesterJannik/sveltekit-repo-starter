import Home from 'lucide-svelte/icons/home';

import Package2 from 'lucide-svelte/icons/package-2';

export const siteData = {
	appShellTitle: 'Starter Template',
	dashboardLinks: [
		{
			name: 'Dashboard',
			icon: Home,
			href: '/protected/dashboard'
		},
		{
			name: 'Another Page',
			icon: Package2,
			href: '/protected/another-page'
		}
	]
};
