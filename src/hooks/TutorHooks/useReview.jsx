import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchReviews =  async (id) => {
  return Api.getReviews(id).then(res => res.data)
}

const useReviews = (id) => {
  return useQuery(['reviews', id], () => fetchReviews(id))
}

export default useReviews
