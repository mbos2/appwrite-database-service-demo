import { writable } from 'svelte/store';

export const Rule = writable({
	label: '',
	key: '',
	type: '',
	default: '',
	required: false,
	array: false,
	list: []
});
