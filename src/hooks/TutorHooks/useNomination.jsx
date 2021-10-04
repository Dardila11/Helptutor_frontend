import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

const fetchNomination = async (id) => {
  return Api.getNomination(id).then((res) => res.data)
}

const useNomination = (id) => {
  return useQuery(['nomination', id], () => fetchNomination(id))
}

const useCreateNomination = () => {
  const dispatch = useAuthDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    async (newNomination) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.postNomination(newNomination)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('offers')
        toast.success('Postulación exitosa')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

const useUpdateNomination = () => {
  const dispatch = useAuthDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    async (nomination) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.patchNomination(nomination[0], nomination[1])
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('offers')
        toast.success('Postulación modificada')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

const useDeleteNomination = () => {
  const dispatch = useAuthDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    async (id) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.deleteNomination(id)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('offers')
        toast.success('Postulación eliminada')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export default {
  useNomination,
  useCreateNomination,
  useUpdateNomination,
  useDeleteNomination
}
