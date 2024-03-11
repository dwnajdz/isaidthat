type NavRoutes = Array<{
    name: string,
    href: string,
}>;

// Default navigation for all users
const navigation: NavRoutes = [
    { name: 'Tasks', href: '/tasks' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'People', href: '/people' },
    { name: 'Pricing - $10/lifetime', href: '/pricing' },
];

// Navigation after user is authenticated
const authNavigation: NavRoutes = [
    { name: 'Add Task', href: '/tasks/management/add' },
    { name: 'My Tasks', href: '/tasks/management' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' }
];

export {
    navigation,
    authNavigation,
};