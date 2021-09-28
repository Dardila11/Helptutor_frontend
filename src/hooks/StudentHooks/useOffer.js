import Api from 'src/services/Api'
import { useQuery } from 'react-query'

const fetchOffer = async (id) => {
  return Api.getOfferById(id)
    .then((res) => res.data)
    .then((res) => console.log(res))
}

const useOffer = (id) => {
  return useQuery(['offer', id], () => fetchOffer(id))
}

export default useOffer
