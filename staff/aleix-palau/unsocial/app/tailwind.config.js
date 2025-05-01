/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.jsx'
    ],
    theme: {
        extend: {
            colors: {
                'custom-color': 'lime',
                'custom-back-color': '#111',
            },
            fontFamily: {
                'custom-font': ['Tiny5', 'sans-serif'],
            }
        },
    },
    plugins: [],
}