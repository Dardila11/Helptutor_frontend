import { useQuery } from 'react-query'
import Api from 'src/services/Api'

const useFetchTutors = () => {
  return useQuery('tutors', () =>
    Api.getServicesNew(
      '55640d4598cab673d829efd509c41e4eb03a813c9b7f1af54cbb06c8ea8770a7'
    ).then((res) => res.data)
  )
}

export default useFetchTutors
