import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchOffers = async (userId) => {
  return Api.getOffersByStudentId(userId)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

const usePublications = (userId) => {
  return useQuery(['publications', userId], () => fetchOffers(userId))
}

export default usePublications
