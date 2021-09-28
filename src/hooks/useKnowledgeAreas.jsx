import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchKnowledgeAreas =  async () => {
  return Api.getknowledgeAreas().then(res => res.data)
}

const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeAreas())
}

export default useKnowledgeAreas
