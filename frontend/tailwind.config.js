// tailwind.config.js

module.exports = {
    mode: 'jit', // Just-In-Time mode for faster build times
    purge: [
      './src/app/**/*.{js,jsx,ts,tsx}', // Path to your components/pages
      './src/app/**/**/*.{js,jsx,ts,tsx}', // Path to your components/pages
    ], // or 'media' or 'class'
    theme: {
      extend: {}, // Extend Tailwind's default theme here
    },
    variants: {
      extend: {}, // Extend Tailwind's default variants here
    },
    plugins: [
      require('@tailwindcss/forms'), // Include Tailwind forms plugin
    ],
  };
  