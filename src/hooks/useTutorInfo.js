import { useQuery, useMutation } from 'react-query'
import Api from 'src/services/Api'
import { TOKEN } from './token'

const fetchTutorInfo = async (tutorId) => {
  return Api.getTutorInfoNew(tutorId, TOKEN).then((res) => res.data)
}

export const useTutorInfo = (tutorId) => {
  return useQuery(['tutorInfo', tutorId], () => fetchTutorInfo(tutorId))
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
