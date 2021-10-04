import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const fetchConsultancies = async (studentId) => {
    return Api.getAggrements(studentId).then(res => res.data)
}

export const useConsultancies = (studentId) => {
    return useQuery(['conusltancies', studentId], () => fetchConsultancies(studentId))
}