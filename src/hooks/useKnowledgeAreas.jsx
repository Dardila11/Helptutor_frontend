import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchKnowledgeAreas =  async () => {
  return Api.getknowledgeAreas().then(res => res.data)
}

export const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeAreas())
}

export const fetchSubKnowledgeAreas =  async (id) => {
  return Api.getSubKnowledgeAreas(id).then(res => res.data)
}

export const useSubKnowledgeAreas = (id) => {
  return useQuery('subKnowledgeAreas', () => fetchSubKnowledgeAreas(id))
}
