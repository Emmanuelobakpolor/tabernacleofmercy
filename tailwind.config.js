/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      screens: {
        // Wide enough for the full desktop nav (links + Prayer Request +
        // Give Online) to fit beside the brand lockup without wrapping —
        // the default xl (1280px) is too tight once the container's own
        // 1200px cap and side padding are accounted for.
        nav: '1400px',
      },
      colors: {
        brand: {
          DEFAULT: '#114899',
          deep: '#11418a',
          dark: '#0b3575',
          light: '#EDF3FD',
          tint: '#F6F9FE',
        },
        ink: '#011941',
        muted: '#5B6779',
        line: '#E3E8EF',
        shell: '#F5F5F5',
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px rgba(16,24,40,.06)',
        lift: '0 12px 32px rgba(0, 61, 153, 0.58)',
      },
      maxWidth: { prose: '68ch' },
    },
  },
  plugins: [],
}
