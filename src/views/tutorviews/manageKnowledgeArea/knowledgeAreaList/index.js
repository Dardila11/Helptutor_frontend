//REACT
import React from 'react'

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
  lateralView: {
    borderRadius: '20px'
  },
  button: {
    textTransform: 'none'
  }
}))

const KnowledgeAreaListView = (props) => {
  const classes = useStyles()

  const { list, handleSelect } = props

  return (
    <>
      <Grid item xs={3}>
        <Paper className={classes.lateralView} elevation={2}>
          <Card className={classes.lateralView}>
            <Typography
              className={classes.containerTitle}
              variant="h4"
              align="center">
              Áreas de conocimiento
            </Typography>
            {list.length > 0 ? (
              <>
                {list.map((area, index) => (
                  <AreaCard
                    key={index}
                    area={area.knowledge_area}
                    my_area={area}
                    idArea={area.id}
                    handleSelect={handleSelect}></AreaCard>
                ))}
              </>
            ) : (
              <>
                <Typography align="center">No se encontraron áreas</Typography>
              </>
            )}
            <Container className={classes.actions}>
              <Button
                className={classes.button}
                fullWidth={true}
                color="primary"
                variant="contained"
                endIcon={<AddCircleIcon />}
                onClick={() => handleSelect(null)}>
                Agregar Area
              </Button>
            </Container>
          </Card>
        </Paper>
      </Grid>
    </>
  )
}

export default KnowledgeAreaListView
