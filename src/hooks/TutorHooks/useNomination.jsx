import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'

const fetchNomination = async (id) => {
  return Api.getNomination(id).then((res) => res.data)
}

const useNomination = (id) => {
  return useQuery(['nomination', id], () => fetchNomination(id))
}

const useCreateNomination = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) => {
      console.log('post', newPublication)
      Api.postNomination(newPublication)
    },
    {
      onSuccess: (update) => {
        queryClient.refetchQueries(['offers'])
        toast.success('Postulación exitosa')
      }
    }
  )
}

const useUpdateNomination = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) => {
      Api.patchNomination(newPublication[0], newPublication[1])
    },
    {
      onSuccess: (update) => {
        queryClient.refetchQueries(['offers'])
        toast.success('Postulación modificada')
      }
    }
  )
}

const useDeleteNomination = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) => {
      Api.deleteNomination(newPublication)
    },
    {
      onSuccess: (update) => {
        queryClient.refetchQueries(['offers'])
        toast.success('Postulación eliminada')
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
