import { useQuery } from 'react-query'
import Api from 'src/services/Api'
import { TOKEN } from './token'

const fetchTutorInfo = async (tutorId) => {
  return Api.getTutorInfoNew(
    tutorId,
    TOKEN
  ).then((res) => res.data)
}

const useTutorInfo = (tutorId) => {
    return useQuery(['tutorInfo', tutorId], () => fetchTutorInfo(tutorId))
}

export default useTutorInfo