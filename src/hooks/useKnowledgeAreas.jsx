import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchKnowledgeArea =  async (id) => {
  return Api.getTutorKnowledgeAreas(id).then(res => res.data).ca
}

const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeArea(id))
}

export default useKnowledgeAreas
