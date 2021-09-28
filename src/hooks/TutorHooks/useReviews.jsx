import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorReviews =  async (id) => {
  return Api.getTutorReviews(id).then(res => res.data)
}

export const useReviews = (id) => {
  return useQuery(['tutorReviews',id], () => fetchTutorReviews(id), {
    // disable query from automatically running if id is null
    enabled: id === null ? false : true,
    refetchOnWindowFocus: id === null ? false : true
})
}

