import Api from 'src/services/Api'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'

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

export const useUpdateAdvertisement = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async values => {
      return Api.patchAdvertisement(values[0], values[1])
      .then(res => res.data)
      .catch(err => console.log(err))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('advertisements')
        toast.success('Anuncio modificado satisfactoriamente')
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )
}

export const useDeleteAdvertisement = () => {
  const queryClient = useQueryClient()
  return useMutation((id) => {
    return Api.deleteAdvertisement(id)
      .then((res) => res.data)
      .then((res) => console.log(res))
  },
  {
    onSuccess: (res) => {
      queryClient.invalidateQueries('advertisements')
      toast.success('Anuncio eliminado satisfactoriamente')
    },
    onError: (error) => {
      console.log(error)
      toast.success(`Hubo un error al eliminar el anuncio ${error}`)
    }
  }
)
}


