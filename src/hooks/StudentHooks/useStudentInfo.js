import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchStudentInfo =  async (id) => {
  return Api.getStudentInfo(id).then(res => res.data)
}

export const useStudentInfo = (id) => {
  return useQuery(['studentInfo',id], () => fetchStudentInfo(id))
}
