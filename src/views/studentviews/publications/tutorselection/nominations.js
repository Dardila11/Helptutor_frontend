import React from 'react'
import { Grid } from '@material-ui/core'
import NominationCard from 'src/components/cards/NominationCard'
import NominationCardSkeleton from 'src/components/skeletons/NominationCardSkeleton'
import { useOfferNominations } from 'src/hooks/StudentHooks/useOfferNominations'

const NominationsView = ({ publication, next }) => {
  const offerNominationsQuery = useOfferNominations(publication.id)
  return (
    <Grid container spacing="3">
      {offerNominationsQuery.status === 'success' ? (
        offerNominationsQuery.data.length > 0 ? (
          offerNominationsQuery.data.map((nomination, index) => (
            <Grid item xs={4}>
              <NominationCard
                id={'nom_' + nomination.id}
                key={nomination.id + '_' + index}
                nomination={nomination}
                tutor={nomination.tutor}
                next={next}
              />
            </Grid>
          ))
        ) : (
          <h1>No hay tutores postulados</h1>
        )
      ) : (
        <NominationCardSkeleton />
      )}
    </Grid>
  )
}

export default NominationsView
