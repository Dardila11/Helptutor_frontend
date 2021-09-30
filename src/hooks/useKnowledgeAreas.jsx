import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'

const fetchKnowledgeAreas = async () => {
  return Api.getknowledgeAreas().then((res) => res.data)
}

export const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeAreas())
}
export const fetchSubKnowledgeAreas = async (id) => {
  return Api.getSubKnowledgeAreas(id).then((res) => res.data)
}

export const useUpdateKnowledgeAreaTutor = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) =>
      Api.patchTutorKnowledgeAreas(newPublication[0], newPublication[1]),
    {
      onSuccess: (update) =>
        queryClient.invalidateQueries('tutorKnowledgeAreas')
    }
  )
}

export const useCreateKnowledgeAreaTutor = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (newPublication) => Api.postKnowledgeAreaTutor(newPublication[0]),
    {
      onSuccess: () => queryClient.invalidateQueries('tutorKnowledgeAreas')
    }
  )
}
