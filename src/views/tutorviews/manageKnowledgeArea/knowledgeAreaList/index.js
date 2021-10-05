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
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

//COMPONENTS
import AreaCard from './areaCard'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()
  const { list, handleSelect } = props
  const [isUpdate, setIsUpdate] = React.useState(true)

  const isUpdating = () => {
    setIsUpdate(false)
  }

  return (
    <Paper className={classes.lateralView} elevation={2}>
      <Card className={classes.lateralView}>
        <Container className={classes.actions}>
          <Button
            className={classes.button}
            fullWidth={true}
            color="secundary"
            variant="contained"
            startIcon={<ArrowBackIos />}
            onClick={() => navigate('/tutor/cuenta')}>
            Menú
          </Button>
        </Container>
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
                isUpdating={isUpdating}
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
            onClick={() => {
              handleSelect(null)
              isUpdating(true)
            } }>
            Agregar Area
          </Button>
        </Container>
      </Card>
    </Paper>
  )
}

export default KnowledgeAreaListView
