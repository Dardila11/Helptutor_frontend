//REACT
import React, { useEffect } from 'react'

//REDUX
import {
  getSpecialitiesTutor,
  setIsCreate
} from '../../../../redux/actions/knowledge_areas'
import { connect } from 'react-redux'

//COMPONENTS MATERAIL UI
import {
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'

//COMPONENTS
import AreaCard from './areaCard'

//UTILS
import { isUndefined } from 'lodash-es'

//STYLESS
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingTop: theme.spacing(3)
  },
  containerTitle: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2),
    marginBlockEnd: theme.spacing(2)
  },
  lateralView:{
    borderRadius: '20px'
  }
}))

const KnowledgeAreaListView = (props) => {
  const { specialities_tutor, getSpecialitiesTutor } = props
  const classes = useStyles()
  let info = false
  if (isUndefined(specialities_tutor)) {
    info = false
  } else {
    info = true
  }

  const handleClick = (e) => {
    props.setIsCreate(true)
  }

  useEffect(
    () => {
      getSpecialitiesTutor(props.user.id)
    },[]
  )
  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={2} >
          <Card className={classes.lateralView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Áreas de conocimiento
            </Typography>
            {info ? (
              <>
                {specialities_tutor.map((area, index) => (
                  <AreaCard
                    key={index}
                    area={area.knowledge_area}
                    my_area={area}
                    idArea={area.id}></AreaCard>
                ))}
              </>
            ) : (
              <>
                <Typography align="center">No se encontraron áreas</Typography>
              </>
            )}
            <Container className={classes.actions}>
              <Button
                fullWidth={true}
                color="primary"
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={handleClick}>
                Agregar Area
              </Button>
            </Container>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
  specialities_tutor: state.knowledge_areas.specialities_tutor,
  is_create: state.knowledge_areas.is_create,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  getSpecialitiesTutor,
  setIsCreate
})(KnowledgeAreaListView)
