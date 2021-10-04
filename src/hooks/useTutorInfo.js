import { useMutation } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

export const useUpdateTutor = () => {
  const dispatch = useAuthDispatch()
  return useMutation(
    async (tutor) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.updateTutorInfo(tutor[0], tutor[1])
    },
    {
      onSuccess: () => {
        toast.success('Información actualizada')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}
