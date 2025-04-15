import { createTheme } from '@mui/material'

const customtheme = createTheme({
  typography: {
    fontFamily:
            'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
  },
  palette: {
    primary: {
      main: '#1d4ed8',
      400: '#c4dafb',
      300: '#dbeafe',
      200: '#e0ebfd',
      100: '#eef6ff',
    },
    success: {
      main: '#42c55d',
      light: '#dcfce7',
      contrastText: '#dcfce7',
    },
  },
  direction: 'rtl',
  shape: {
    borderRadius: 10,
  },
})

export {
  customtheme,
}
