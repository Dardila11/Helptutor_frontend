import { useMutation } from 'react-query'
import Api from 'src/services/Api'

export const useUpdateNomination = () => {
	return useMutation(
		async (values) => {
			return Api.patchNomination(values[0], values[1])
				.then(res => res.data)
		},
		{
			onSuccess: () => {
				console.log("success")
			}
		}
	)
}

