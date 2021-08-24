import { useSnackbar } from 'react-simple-snackbar'

export const useShowError = () => useSnackbar(
  {
    position: 'top-right',
    style: {
      backgroundColor: 'red'
    }
  }
)
export const useShowSuccess = () => useSnackbar({
  position: 'bottom-right',
  style: {
    backgroundColor: 'yellow'
  }
})
