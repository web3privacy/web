/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Archivo", ...defaultTheme.fontFamily.sans],
				mono: ["DM Mono", ...defaultTheme.fontFamily.mono],
			  },
		},
	},
	plugins: [],
}
