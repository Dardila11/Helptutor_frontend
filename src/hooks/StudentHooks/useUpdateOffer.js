import Api from 'src/services/Api'
import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'

const useUpdateOffer = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (values) => {
      return Api.patchOffer(values[0], values[1])
        .then((res) => res.data)
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('publications')
        toast.success('Publicación eliminada satisfactoriamente')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
}

export default useUpdateOffer
