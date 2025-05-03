export const appTheme = {
    colors: {
      // Core colors
      dark: {
        primary: '#121212',
        secondary: '#1E1E1E',
        tertiary: '#2D2D2D'
      },
      gray: {
        100: '#F5F5F5',  // Lightest - for dark mode text
        200: '#E0E0E0',  // Light text
        300: '#BDBDBD',  // Secondary text
        400: '#9E9E9E',  // Disabled elements
        500: '#757575',  // Icons/inactive states
        600: '#616161',  // Borders
        700: '#424242'   // Dark gray elements
      },
      accent: {
        primary: '#00E676',  // Main accent (green)
        hover: '#00C764',    // Hover state
        active: '#00B859'     // Pressed state
      },
      status: {
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3'
      }
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
      inverted: '#121212'  // For text on light backgrounds
    },
    shadows: {
      card: '8px 8px 16px #0A0A0A, -8px -8px 16px #1A1A1A',
      button: '0 4px 6px rgba(0, 0, 0, 0.3)',
      hover: '0 6px 8px rgba(0, 0, 0, 0.4)'
    }
  };