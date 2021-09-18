import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchKnowledgeAreas =  async () => {
  return Api.getKnowledgeAreas().then(res => res.data).ca
}

const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeAreas())
}

export default useKnowledgeAreas
