import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass' : 'url(/glass.svg)'
      },
      content : {
        'bookIcon' : 'url(/book.svg)' ,
        'moreArrowIcon' : 'url(/morearrow.svg)',
        'lessArrowIcon' : 'url(/lessarrow.svg)',
        'heart' : 'url(/heart.svg)',
        'userImage' : 'url(/userimage.svg',
        'glassIcon': 'url(/glass.svg',
      },
      colors: {
        'DarkGreen/15': '#1A3129',
        'DarkGreen/20': '#234338',
        'DarkGreen/25': '#2C5446',
        'Green/70' : '#CBEA7B',
        'Green/85' : '#E5F5BD',
        'Green/90' : '#EEF8D3',
        'Green/95' : '#F6FBE9',
        'Green/97' : '#FAFDF2',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
export default config
