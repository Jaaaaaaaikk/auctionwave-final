/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./assets/**/*.{css,js,ts}",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-darkbrown':'#23120B',
        'custom-white':'#F1F1F1',
        'custom-yellow':'#FDB827',
        'custom-blue':'#21209C',
        'custom-fuschia':'#ADACFF',
        'custom-bluegreen':'#005262',
        'custom-bluegreen2':'#002931',
        'custom-gray':'#565656',
        'custom-green':'#bde5ac',
        'custom-green2':'#00191d',
        'custom-blue2':'#e6eeef',
      },
      fontSize: {
       
        'custom-size': '1.4rem', // Custom size, e.g., 40px
      },
      height: {
        '128': '32rem', // Custom height value (e.g., h-128)
        '144': '36rem', // Another custom height value
        '162': '40rem',
        'screen-90': '90vh', // Example of height using viewport units
      },
      margin: {
        '17': '68px',   
        '25': '100px',   // Custom mt-25 class
        '26': '104px',   // Custom mt-26 class
        '27': '108px',   // Custom mt-27 class
        '70': '280px',
        '71': '284px',
        '72': '288px',
        '73': '292px',
        '74': '296px',
        '74.5': '297px',
        '75': '300px',
        '76': '304px',
        '77': '308px',
        '78': '312px',
        '79': '316px',
        '80': '320px',
        '81': '324px',
        '82': '328px',
        '83': '332px',
        '84': '336px',
        '85': '340px',
        '86': '344px',
        '87': '348px',
        '88': '352px',
        '89': '356px',
        '90': '360px',
        '91': '364px',
        '92': '368px',
        '93': '372px',
        '94': '376px',
        '95': '380px',
      },
      
      fontFamily: {
        sans: ['Exo', 'Helvetica', 'Arial', 'sans-serif'], // Add "Exo" to the sans font stack
      },
      
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      width: {
        '65': '16.25rem', // 260px
        '66': '16.5rem',  // 264px
        '67': '16.75rem', // 268px
        '68': '17rem',    // 272px
        '69': '17.25rem', // 276px
        '70': '17.5rem',  // 280px
      },
      padding: {
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '20': '80px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
      }


    },
  },
  plugins: [require("flowbite/plugin")],
};