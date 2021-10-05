import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

const fetchKnowledgeAreas = async () => {
  return Api.getknowledgeAreas().then((res) => res.data)
}

export const useKnowledgeAreas = () => {
  return useQuery('knowledgeAreas', () => fetchKnowledgeAreas())
}
export const fetchSubKnowledgeAreas = async (id) => {
  return Api.getSubKnowledgeAreas(id).then((res) => res.data)
}

export const useCreateKnowledgeAreaTutor = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (newKnowledgeArea) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.postKnowledgeAreaTutor(newKnowledgeArea[0])
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tutorKnowledgeAreas')
        toast.success('Especialidad registrada')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export const useUpdateKnowledgeAreaTutor = () => {
  const queryClient = useQueryClient()
  const dispatch = useAuthDispatch()
  return useMutation(
    async (knowledgeArea) => {
      dispatch({
        type: LOADING_ACTION
      })
      return await Api.patchTutorKnowledgeAreas(
        knowledgeArea[0],
        knowledgeArea[1]
      )
    },
    {
      onSuccess: (update) => {
        queryClient.invalidateQueries('tutorKnowledgeAreas')
        toast.success('Especialidad actualizada')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export const useDeleteKnowledgeAreaTutor = () => {
  const queryClient = useQueryClient()
  return useMutation( async (id) => {
    return Api.deleteTutorKnowledgeArea(id)
      .then((res) => res.data)
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('tutorKnowledgeAreas')
    },
    onError: (error) => {
      console.log(error)
    }
  }
)
}
