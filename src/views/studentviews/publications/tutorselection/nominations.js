import React from 'react'
import { Grid, List, ListItem, makeStyles } from '@material-ui/core'
import NominationCard from 'src/components/cards/NominationCard'
import NominationCardSkeleton from 'src/components/skeletons/NominationCardSkeleton'
import { useOfferNominations } from 'src/hooks/StudentHooks/useOfferNominations'

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
  }
}))

const NominationsView = ({ publication, next }) => {
  const classes = useStyles()
  const offerNominationsQuery = useOfferNominations(publication.id)
  return (
    <Grid container spacing="3">
      {offerNominationsQuery.status === 'success' ? (
        offerNominationsQuery.data.length > 0 ? (
          <List className={classes.list}>
            {offerNominationsQuery.data.map((nomination, index) => (
              <ListItem key={index}>
                <NominationCard
                  id={'nom_' + nomination.id}
                  key={nomination.id + '_' + index}
                  nomination={nomination}
                  tutor={nomination.tutor}
                  next={next}
                />
              </ListItem>
            ))}
          </List>
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
