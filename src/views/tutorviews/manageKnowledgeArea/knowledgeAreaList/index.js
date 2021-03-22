//REACT
import React from 'react'

//REDUX
import { getKnowledgeAreas } from '../../../../redux/actions/knowledge_areas'
import { connect } from 'react-redux'

//COMPONENTS MATERAIL UI
import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

//COMPONENTS
import AreaCard from './areaCard'

//UTILS
import { isUndefined } from 'lodash-es'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  }
}))

const KnowledgeAreaListView = (areas) => {
  const classes = useStyles()
  let info = false
  console.log(areas)
  if (isUndefined(areas.areas)) {
    info = false
  } else {
    info = true
  }
  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={3}>
          <Card>
            <Typography
              className={classes.containerTitle}
              variant="h3"
              align="center">
              Areas de conocimiento
            </Typography>
            {info ? (
              <>
                {areas.areas.map((area, index) => (
                  <AreaCard
                    key={index}
                    area={area.knowledge_area}
                    idArea={area.id}></AreaCard>
                ))}
              </>
            ) : (
              <>
                <Typography>No se encontraron areas</Typography>
              </>
            )}
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
  knowledge_areas: state.knowledge_areas.knowledge_areas
})

export default connect(mapStateToProps, {
  getKnowledgeAreas
})(KnowledgeAreaListView)
