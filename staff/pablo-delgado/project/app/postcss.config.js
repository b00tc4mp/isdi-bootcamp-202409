import nesting from 'postcss-nesting'

export default {
  plugins: {
    // primero el plugin para CSS nesting
    'postcss-nesting': {},

    // luego tailwindcss y autoprefixer
    tailwindcss: {},
    autoprefixer: {},
  },
}
