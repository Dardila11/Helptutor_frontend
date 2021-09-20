import Api from 'src/services/Api'
import { useMutation } from 'react-query'

const useCreatePublication = () => {
  return useMutation((newPublication) => {
    return Api.postOffer(newPublication)
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch(err => console.log(err)), {
          onMutate: (newPublication) => {
              console.log(newPublication)
              return newPublication
          },
          onSuccess: (res) => {
              console.log(res)
          },
          onError: (error) => {
              console.log(error)
          }
      }
  })
}

export default useCreatePublication
