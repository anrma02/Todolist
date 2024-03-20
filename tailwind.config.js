/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            margin: 'auto 50px',
        },
        extend: {},
    },
    // eslint-disable-next-line no-undef
    plugins: [require('daisyui')],
};
