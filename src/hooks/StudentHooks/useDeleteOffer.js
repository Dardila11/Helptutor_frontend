import Api from 'src/services/Api'
import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'

const useDeleteOffer = (id) => {
  const queryClient = useQueryClient()
  return useMutation(() => {
      return Api.deleteOffer(id)
        .then((res) => res.data)
        .then((res) => console.log(res))
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('publications')
        toast.success('Publicación eliminada satisfactoriamente')
      },
      onError: (error) => {
        console.log(error)
        toast.success(`Hubo un error al eliminar la publicación ${error}`)
      }
    }
  )
}

export default useDeleteOffer
