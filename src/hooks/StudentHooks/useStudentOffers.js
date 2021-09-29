import { useQuery, useMutation, useQueryClient } from 'react-query'
import Api from 'src/services/Api'

const fetchOffersByStudentId = async (userId) => {
  return Api.getOffersByStudentId(userId)
    .then((res) => res.data)
    .catch((err) => console.log(err))
}

/**
 * fetch offers by student id.
 * @param {*} userId 
 * @returns 
 */
export const useOffersByStudentId = (userId) => {
  return useQuery(['studentOffers', userId], () =>
    fetchOffersByStudentId(userId)
  )
}

const fetchOffer = async (id) => {
  return Api.getOfferById(id)
    .then((res) => res.data)
    .then((res) => console.log(res))
}

/**
 * fetch an offer by id.
 * @param {*} id
 * @returns
 */
export const useOffer = (id) => {
  return useQuery(['offer', id], () => fetchOffer(id))
}

const fetchOffers = async () => {
  return Api.getOffers().then((res) => res.data)
}

/**
 * Fetch all offfers.
 * @returns
 */
export const useOffers = () => {
  return useQuery('offers', () => fetchOffers())
}

/**
 * Post a new Offer.
 * new offer object is sent in the mutation.mutate() function.
 * @returns
 */
export const useCreateOffer = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (newOffer) => {
      return Api.postOffer(newOffer)
        .then((res) => res.data)
        .catch((err) => console.log(err))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('studentOffers')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
}

/**
 * Update an offer.
 * id param is sent in the mutation.mutate() function.
 * @returns
 */
export const useUpdateOffer = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (values) => {
      return Api.patchOffer(values[0], values[1]).then((res) => res.data)
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('studentOffers')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
}

/**
 * Delete an offer.
 * id param is sent in the mutation.mutate() function.
 * @returns
 */
export const useDeleteOffer = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (id) => {
      return Api.deleteOffer(id)
        .then((res) => res.data)
        .then((res) => console.log(res))
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('studentOffers')
      },
      onError: (error) => {
        console.log(error)
      }
    }
  )
}
