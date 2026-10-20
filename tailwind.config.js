export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { brand: '#435471', wood: '#8a5a3c', cream: '#f7f2ec', ink: '#1f2430', accent: '#c8553d' },
    fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'], serif: ['"Playfair Display"', 'serif'] },
    maxWidth: { site: '1320px' }
  } },
  plugins: []
}
