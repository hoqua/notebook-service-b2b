import { useSnackbar } from 'react-simple-snackbar'
import { theme } from '../styles/theme'

export const useNotify = () => {
  const [showError] = useSnackbar(
    {
      position: 'bottom-right',
      style: {
        backgroundColor: theme.status.error
      }
    }
  )
  const [showSuccess] = useSnackbar({
    position: 'bottom-right',
    style: {
      backgroundColor: theme.status.success
    }
  })

  return { showError, showSuccess }
}
