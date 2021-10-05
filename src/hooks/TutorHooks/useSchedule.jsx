import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

const fetchTutorSchedule = async (id) => {
  return Api.getSchedule(id).then((res) => res.data)
}

const useTutorSchedule = (id) => {
  return useQuery(['Schedule', id], () => fetchTutorSchedule(id))
}

const useCreateTutorSchedule = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (newSchedule) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.postSchedule(newSchedule)
    },
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('Schedule')
        toast.success('Horario guardado')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

const useUpdateTutorSchedule = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (Schedule) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.patchScheduleTutor(Schedule[1], Schedule[0])
    },
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('Schedule')
        toast.success('Servicio actualizado')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export default {
  useTutorSchedule,
  useCreateTutorSchedule,
  useUpdateTutorSchedule
}
