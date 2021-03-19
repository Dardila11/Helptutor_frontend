import React, { useEffect, useState } from 'react'
import { Card, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select} from '@material-ui/core'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import Api from '../../../../services/Api'
import SupportsView from './supports'
import { isUndefined } from 'lodash-es'

const useStyles = makeStyles((theme) => ({
  
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  input: {
    color: '#005579'
  },
  containerTitle:{
      marginTop: theme.spacing(2),
      marginBlockEnd: theme.spacing(2)
  }
}))

const KnowledgeAreaInfoView = (props) => {
    const classes = useStyles() 
    const [areasList,setAreasList] = useState([])
    const [subareas, setsubareas] = useState([])
    let option = false
    let initialvalues = {}

    if(isUndefined(props.area)){
        option = true
        initialvalues = {
            area: '',
            subarea: '',
            description: '',
            tags: ''
        }
        console.log("area undefined")
    }else{
        console.log("area defined")
        initialvalues = {
            area: '',
            subarea: '',
            description: props.area.description,
            tags: props.area.tags
        }
    }
    useEffect(() => {
        const fetchData = async () => {
          await Api.getknowledgeAreas().then(res => {
              setAreasList(res.data)
          });          
        };
        fetchData();
      }, []);
    const handleSelect = (e) => {
        console.log("Area seleccionada: ")
        console.log(e.target.value.name)
        Api.getSubKnowledgeAreas(e.target.value.id).then(res => {
                  console.log(res.data)
                  setsubareas(res.data)
              });
    }
    return (
        <>
            <Grid item xs={8}>
                <Paper className={classes.infoView} elevation={3}>
                    <Card>
                        <Typography className={classes.containerTitle} variant='h3' align='center'> 
                            Información del area
                        </Typography>
                        <Box
                                display="flex"
                                flexDirection="column"
                                height="100%"
                                justifyContent="center">
                                <Container maxWidth="sm">
                                <Formik
                                    initialValues={initialvalues}
                                    validationSchema={Yup.object().shape({
                                    area: Yup.string().max(255).required('Area requerida'),
                                    subarea: Yup.string().max(255).required('Sub area requerida'),
                                    description: Yup.string().max(255),
                                    tags: Yup.string().max(255)
                                    })}
                                    onSubmit={(values) => {
                                    console.log(values)
                                    let jsonValues = {
                                        tags: values.tags,
                                        description: values.description,
                                        knowledge_area: values.subarea.id,
                                        user: 12
                                    }
                                    console.log(jsonValues)
                                    Api.postKnowledgeAreaTutor(jsonValues).then((res) => {
                                        if (res.status === 200) {
                                        console.log(res.status)
                                        }
                                    })
                                    }}>
                                    {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values
                                    }) => (
                                    <form onSubmit={handleSubmit}>
                                        
                                        <FormControl
                                        variant="outlined"
                                        className={classes.selectControl}
                                        error={Boolean(touched.area && errors.area)}
                                        helpertext={touched.area && errors.area}
                                        fullWidth>
                                        <InputLabel id="select-area-label"> Area </InputLabel>
                                        <Select
                                            labelId="select-area-label"
                                            id="select-area"
                                            value={values.area}
                                            name="area"
                                            onChange={e => { handleChange(e); handleSelect(e) }}
                                            label="Area">
                                            <MenuItem value="">
                                            <em>---</em>
                                            </MenuItem>
                                            {areasList.map((area, index) => (
                                                <MenuItem key={index} value={area}>
                                                    {area.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {Boolean(touched.area && errors.area) && (
                                            <FormHelperText error> {errors.area} </FormHelperText>
                                        )}
                                        </FormControl>
                                        <FormControl
                                        variant="outlined"
                                        className={classes.selectControl}
                                        error={Boolean(touched.subarea && errors.subarea)}
                                        helpertext={touched.subarea && errors.subarea}
                                        fullWidth>
                                        <InputLabel id="select-subarea-label"> subArea </InputLabel>
                                        <Select
                                            labelId="select-subarea-label"
                                            id="select-subarea"
                                            value={values.subarea}
                                            name="subarea"
                                            onChange={handleChange}
                                            label="Sub Area">
                                            <MenuItem value="">
                                            <em>---</em>
                                            </MenuItem>
                                            {subareas.map((subarea, index) => (
                                            <MenuItem key={index} value={subarea}>
                                                {subarea.name}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        {Boolean(touched.subarea && errors.subarea) && (
                                            <FormHelperText error> {errors.subarea} </FormHelperText>
                                        )}
                                        </FormControl>
                                        <TextField
                                        error={Boolean(touched.tags && errors.tags)}
                                        fullWidth
                                        helperText={touched.tags && errors.tags}
                                        label="Etiquetas, describa palabras clave separadas por coma(,)"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="tags"
                                        value={values.tags}
                                        variant="outlined"
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        />
                                        <TextField
                                        error={Boolean(touched.description && errors.description)}
                                        fullWidth
                                        helperText={touched.description && errors.description}
                                        label="Descripción"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="description"
                                        value={values.description}
                                        variant="outlined"
                                        />
                                       <SupportsView></SupportsView>
                                        <Box my={2}>
                                        <Button
                                            color="primary"
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained">
                                            Registrar Area de conocimiento
                                        </Button>
                                        </Box>
                                        <Box my={2}>
                                        </Box>
                                    </form>
                                    )}
                                </Formik>
                                </Container>
                            </Box>
                    </Card>
                </Paper>
            </Grid>
        </>
    )
}

export default KnowledgeAreaInfoView