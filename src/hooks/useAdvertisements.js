import Api from 'src/services/Api'
import { useQuery, useQueryClient, useMutation } from 'react-query'

const fetchAdvertisements = async () => {
  return Api.getAdvertisements().then((res) => res.data)
}

export const useAdvertisements = () => {
  return useQuery('advertisements', () => fetchAdvertisements())
}


export const useCreateAdvertisement = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (newAd) => {
      return Api.postAdvertisement(newAd)
      .then(res => res.data)
      .catch(err => console.log(err))
    },
    {
      onSuccess: () => {
        console.log('updating ads query')
        queryClient.invalidateQueries('advertisements')
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )
}


