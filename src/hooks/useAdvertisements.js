import Api from 'src/services/Api'
import { useQuery, useQueryClient, useMutation } from 'react-query'

const fetchAdvertisements = async () => {
  return Api.getAdvertisements().then((res) => res.data)
}

export const useAdvertisements = () => {
  return useQuery('advertisements', () => fetchAdvertisements())
}

const fetchAdvertisementAnswers = async (id) => {
  return Api.getAdvertisementAnswers(id).then(res => res.data)
}

export const useAdvertisementAnswers = (id) => {
  return useQuery(['advertisementAnswers', id], () => fetchAdvertisementAnswers(id))
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
        queryClient.invalidateQueries('advertisements')
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )
}

export const useCreateAdvertisementAnswer = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (newAnswer) => {
      return Api.postAnswer(newAnswer)
      .then(res => res.data)
      .catch(err => console.log(err))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('advertisementAnswers')
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
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )
}

export const useDeleteAdvertisement = () => {
  const queryClient = useQueryClient()
  return useMutation( async (id) => {
    return Api.deleteAdvertisement(id)
      .then((res) => res.data)
      .then((res) => console.log(res))
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('advertisements')
    },
    onError: (error) => {
      console.log(error)
    }
  }
)
}


