import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorServices = async (id) => {
  return Api.getTutorServices(id).then((res) => res.data)
}

const useTutorServices = (id) => {
  return useQuery(['services', id], () => fetchTutorServices(id))
}

const useCreateTutorService = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) => Api.postServiceTutor(newPublication[0]),
    {
      onSuccess: (update) => queryClient.invalidateQueries('services')
    }
  )
}

const useUpdateTutorService = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) =>
      Api.patchServiceTutor(newPublication[1], newPublication[0]),
    {
      onSuccess: (update) => queryClient.invalidateQueries('services')
    }
  )
}

export default {
  useTutorServices,
  useCreateTutorService,
  useUpdateTutorService
}
