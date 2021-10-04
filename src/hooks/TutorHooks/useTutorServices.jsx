import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

const fetchTutorServices = async (id) => {
  return Api.getTutorServices(id).then((res) => res.data)
}

const useTutorServices = (id) => {
  return useQuery(['services', id], () => fetchTutorServices(id))
}

const useCreateTutorService = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (newService) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.postServiceTutor(newService[0])
    },
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('services')
        toast.success('Servicio creado')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

const useUpdateTutorService = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (service) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.patchServiceTutor(service[1], service[0])
    },
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('services')
        toast.success('Servicio actualizado')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export default {
  useTutorServices,
  useCreateTutorService,
  useUpdateTutorService
}
