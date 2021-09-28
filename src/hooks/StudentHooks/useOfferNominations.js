import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchOfferNominations = async (id) => {
  return Api.getOfferNominations(id).then(res => res.data)
}

export const useOfferNominations = id => {
  return useQuery(['offerNominations', id], () => fetchOfferNominations(id))
}


