/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined)
      return `rgba(var(${variableName}), ${opacityValue})`;

    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        skin: {
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          action: withOpacity('--color-action'),
        },
      },
      margin: {
        13: '3.2rem',
      },
      borderWidth: {
        15: '15px',
        30: '30px',
      },
      dropShadow: {
        textBorder: '0 2.2px 2.2px rgba(0,0,0,1)',
      },
    },
    screens: {
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
