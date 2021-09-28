import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchSpecialities =  async (id) => {
  return Api.getSubKnowledgeAreas(id).then(res => res.data)
}

const useSpecialities = (id) => {
  return useQuery(['specialities',id], () => fetchSpecialities(id))
}

export default useSpecialities
