import Api from 'src/services/Api'
import { useMutation, useQueryClient } from 'react-query'
//import { toast } from 'react-toastify'

const useCreatePublication = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (newPublication) => {
      return Api.postOffer(newPublication)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    {
      onSuccess: () => {
        console.log('updating queries')
        queryClient.invalidateQueries('publications')
      },
      onError: (error) => {
        console.log(error)
      },
    }
  )
}

export default useCreatePublication
