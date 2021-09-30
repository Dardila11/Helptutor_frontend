import { useMutation } from 'react-query'
import Api from 'src/services/Api'

export const useUpdateTutor = () => {
  return useMutation((newPublication) =>
    Api.updateTutorInfo(newPublication[0], newPublication[1])
  )
}
