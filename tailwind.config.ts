import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071E3',
          gray: '#1D1D1F',
          lightgray: '#F5F5F7',
        },
        // 主题渐变色 - 琥珀-深橙
        theme: {
          primary: {
            light: '#fbbf24', // amber-400
            DEFAULT: '#f59e0b', // amber-500
            dark: '#d97706', // amber-600
          },
          secondary: {
            light: '#fb923c', // orange-400
            DEFAULT: '#f97316', // orange-500
            dark: '#ea580c', // orange-600
          },
          gradient: {
            from: '#fbbf24', // amber-400
            via: '#f59e0b', // amber-500
            to: '#ea580c', // orange-600
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-noto-sans-sc)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['80px', { lineHeight: '1.05', fontWeight: '600' }],
        'headline': ['56px', { lineHeight: '1.07', fontWeight: '600' }],
        'title': ['40px', { lineHeight: '1.1', fontWeight: '600' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
