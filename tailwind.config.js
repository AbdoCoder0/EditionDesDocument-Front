/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'bold': 700,
        'medium': 500,
        'regular': 400,
        'light': 300,
      },
      fontSize: {
        'h1': '32px',
        'h2': '24px',
        'h3': '20px',
        'body': '16px',
        'caption': '14px',
        'note': '12px',
      },
      colors: {
        // Couleurs Principales
        'bleu-fonce': '#004b9c',
        'orange': '#fab001',
        // Couleurs Secondaires
        'bleu-clair': '#2196F3',
        'orange-clair': '#FF9800',
        // Couleurs de Support
        'gris-clair': '#E0E0E0',
        'gris-moyen': '#9E9E9E',
        'gris-fonce': '#424242',
        // Headers
        primaryBackground: '#FFFFFF',
        secondaryBackground: '#F5F5F5',
        primaryText: '#212121',
        secondaryText: '#757575',
        // cart and modale
        darkBlue: '#1A237E',
        darkGray: '#424242',
        lightGray: '#E0E0E0',
        
      },
      boxShadow: {
        card: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        modal: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        card: '4px',
        modal: '4px',
      },
    },
  },
  plugins: [],
}