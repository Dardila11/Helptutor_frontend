import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchNomination =  async (id) => {
  return Api.getNomination(id).then(res => res.data)
}

const useNomination = (id) => {
  return useQuery(['nomination',id], () => fetchNomination(id))
}

export default useNomination
