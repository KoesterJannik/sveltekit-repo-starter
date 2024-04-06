import type { User } from 'lucia';
import { writable } from 'svelte/store';

export const currentUser = writable<User | null>(null);

export const setCurrentUser = (user: User | null) => {
	currentUser.set(user);
};
