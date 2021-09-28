import { useQuery, useMutation } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorInfo =  async (id) => {
  return Api.getTutorInfo(id).then(res => res.data)
}

export const useTutorInfo = (id) => {
  return useQuery(['tutorInfo',id], () => fetchTutorInfo(id), {
    // disable query from automatically running if id is null
    enabled: id === null ? false : true,
    refetchOnWindowFocus: id === null ? false : true
})
}

export const useUpdateTutor = () => {
  return useMutation((newPublication) => {
    console.log(...newPublication)
    return (
      Api.updateTutorInfo(newPublication[0], newPublication[1])
        .then((res) => res.data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err)),
      {
        onMutate: (newPublication) => {
          console.log(newPublication[0])
          return newPublication[0]
        },
        onSuccess: (res) => {
          console.log(res)
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  })
}
