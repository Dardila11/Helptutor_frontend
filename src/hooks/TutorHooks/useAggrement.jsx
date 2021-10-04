import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'
import { toast } from 'react-toastify'
import { useAuthDispatch } from 'src/context'
import { STOP_ACTION, LOADING_ACTION } from 'src/context/types'

const fetchAggrements = async (pk_user) => {
  return Api.getAggrements(pk_user).then((res) => res.data)
}

const useAggrements = (pk_user) => {
  return useQuery(['aggrements', pk_user], () => fetchAggrements(pk_user))
}

const useUpdateAggrement = () => {
  const dispatch = useAuthDispatch()
  const queryClient = useQueryClient()
  return useMutation(
    async (aggrement) => {
      dispatch({
        type: LOADING_ACTION
      })
      console.log(aggrement)
      return await Api.patchAggrement(aggrement[0], aggrement[1])
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('aggrements')
        toast.success('Acuerdo actualizado')
        dispatch({
          type: STOP_ACTION
        })
      }
    }
  )
}

export default { useAggrements, useUpdateAggrement }
