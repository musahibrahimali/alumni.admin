module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  /* optimize for fast reload, dropping all non essential utility classes*/
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      // extend font family
      fontFamily: {
        'sans': ['Roboto', "ui-sans-serif", "BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
      /* background image */
      backgroundImage: theme => ({
        'hero-section': "url('https://source.unsplash.com/random')",
        'mission': "url('https://source.unsplash.com/random')",
        'error-page': "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
      }),
      /* add to max width */
      maxWidth: {
        '8xl': '1920px', // custom screen size
      },
      /* height */
      height: {
        'hero-section': "40rem",
        'banner': '30rem',
      },
      /* colors */
      colors: {
        // Configure your color palette here
        'dark-color': {
          800: "rgba(0,0,0,0.66)",
          900: "#121212",
        },
        'events-color': '#ECF1F5',
        'blog-color': '#F0F2F5',
      },
      /* animations */
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        blob: "blob 7s infinite"
      },

      /* keyframes */
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1.0)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1.0)",
          },
        },

        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
