import { useQuery, useQueryClient, useMutation } from 'react-query'
import Api from 'src/services/Api'

const fetchStudentInfo =  async (id) => {
  return Api.getStudentInfo(id).then(res => res.data)
}

export const useStudentInfo = (id) => {
  return useQuery(['studentInfo',id], () => fetchStudentInfo(id))
}

export const useUpdateStudentInfo = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (values) => {
      return Api.updateStudentInfo(values)
        .then((res) => res.data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('studentInfo')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
}
