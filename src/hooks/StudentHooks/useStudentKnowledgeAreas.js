import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchStudentKnowledgeAreas = async (id) => {
  return Api.getStudentKnowledgeAreas(id)
    .then((res) => res.data)
}

const useStudentKnowledgeAreas = (id) => {
  return useQuery(['studentKnowledgeAreas', id], () =>
    fetchStudentKnowledgeAreas(id)
  )
}

export default useStudentKnowledgeAreas
