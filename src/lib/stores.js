import { writable } from 'svelte/store';

export const registrationOpen = writable(false);

export const user = writable(null);
