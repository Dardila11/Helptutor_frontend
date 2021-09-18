import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchTutorKnowledgeArea =  async (id) => {
  return Api.getTutorKnowledgeAreas(id).then(res => res.data).ca
}

const useTutorKnowledgeAreas = (id) => {
  return useQuery(['tutorKnowledgeAreas',id], () => fetchTutorKnowledgeArea(id))
}

export default useTutorKnowledgeAreas
