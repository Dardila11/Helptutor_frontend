//REACT
import React, { useEffect } from 'react'

//REDUX
import { getSpecialitiesTutor } from '../../../../redux/actions/knowledge_areas'
import { connect } from 'react-redux'

//COMPONENTS MATERAIL UI
import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

//COMPONENTS
import AreaCard from './areaCard'

//UTILS
import { isUndefined } from 'lodash-es'
import { getThemeProps } from '@material-ui/styles'

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

const KnowledgeAreaListView = (props) => {

  const {specialities_tutor, getSpecialitiesTutor} = props
  const classes = useStyles()
  let info = false
  console.log(props)
  if (isUndefined(specialities_tutor)) {
    info = false
  } else {
    info = true
  }
  useEffect(() => {
      getSpecialitiesTutor(11)
  },[])
  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={3}>
          <Card>
            <Typography
              className={classes.containerTitle}
              variant="h3"
              align="center">
              Áreas de conocimiento
            </Typography>
            {info ? (
              <>
                {specialities_tutor.map((area, index) => (
                  <AreaCard
                    key={index}
                    area={area.knowledge_area}
                    idArea={area.id}></AreaCard>
                ))}
              </>
            ) : (
              <>
                <Typography>No se encontraron áreas</Typography>
              </>
            )}
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
    specialities_tutor: state.knowledge_areas.specialities_tutor
})

export default connect(mapStateToProps, {
  getSpecialitiesTutor
})(KnowledgeAreaListView)
