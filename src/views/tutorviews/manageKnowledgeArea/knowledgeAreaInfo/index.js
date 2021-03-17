import React from 'react'
import { Card, Grid, Paper} from '@material-ui/core'
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

const KnowledgeAreaInfoView = () => {
    const classes = useStyles() 
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
                                    initialValues={{
                                    nameKnowledgeArea: '',
                                    subCategoryKnoledgeArea: '',
                                    Description: '',
                                    Tags: '',
                                    password: '',
                                    confirmPassword: '',
                                    policy: false,
                                    isStudent: true,
                                    isTutor: false
                                    }}
                                    validationSchema={Yup.object().shape({
                                    name: Yup.string().max(255).required('Nombre es requerido'),
                                    email: Yup.string()
                                        .email('Debe ser un email valido')
                                        .max(255)
                                        .required('Correo Electrónico es requerido'),
                                    country: Yup.string().max(255).required('Pais es requerido'),
                                    phone: Yup.string().max(255).required('Teléfono es requerido'),
                                    password: Yup.string()
                                        .max(255)
                                        .required('Contraseña es requerido'),
                                    confirmPassword: Yup.mixed()
                                        .test('iguales', 'Contraseñas no son iguales', function () {
                                        return this.parent.password === this.parent.confirmPassword
                                        })
                                        .required('Contraseña es requerido'),
                                    policy: Yup.boolean().oneOf(
                                        [true],
                                        'Este campo debe ser aceptado'
                                    )
                                    })}
                                    onSubmit={(values) => {
                                    /* 
                                    1. call api
                                    2. Check whether is a valid user
                                    3. show message
                                    4. Navigate to login page. navigate('/tutor', { replace: true });
                                    */
                                    console.log('Registrando')
                                    console.log(values)
                                    let jsonValues = {
                                        first_name: values.nameKnowledgeArea,
                                        email: values.subCategoryKnoledgeArea,
                                        country: values.Description,
                                        telephone: values.Tags,
                                        password: values.password
                                    }
                                    console.log(jsonValues)
                                    Api.postTutor(jsonValues).then((res) => {
                                        if (res.status === 201) {
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
                                        <TextField
                                        error={Boolean(touched.nameKnowledgeArea && errors.nameKnowledgeArea)}
                                        fullWidth
                                        helperText={touched.nameKnowledgeArea && errors.nameKnowledgeArea}
                                        label="Nombre del area"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="name"
                                        value={values.nameKnowledgeArea}
                                        variant="outlined"
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        />
                                        <TextField
                                        error={Boolean(touched.subCategoryKnoledgeArea && errors.subCategoryKnoledgeArea)}
                                        fullWidth
                                        helperText={touched.subCategoryKnoledgeArea && errors.subCategoryKnoledgeArea}
                                        label="Sub-Categoria del area"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="email"
                                        value={values.subCategoryKnoledgeArea}
                                        variant="outlined"
                                        />
                                        {/*
                                        <FormControl
                                        variant="outlined"
                                        className={classes.selectControl}
                                        error={Boolean(touched.country && errors.country)}
                                        helpertext={touched.country && errors.country}
                                        fullWidth>
                                        <InputLabel id="select-country-label"> Pais </InputLabel>
                                        <Select
                                            labelId="select-country-label"
                                            id="select-country"
                                            value={values.country}
                                            name="country"
                                            onChange={handleChange}
                                            label="Pais">
                                            <MenuItem value="">
                                            <em>---</em>
                                            </MenuItem>
                                            {countries.map((country, index) => (
                                            <MenuItem key={index} value={country}>
                                                {country.name}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        {Boolean(touched.country && errors.country) && (
                                            <FormHelperText error> {errors.country} </FormHelperText>
                                        )}
                                        </FormControl>*/}
                                        <TextField
                                        error={Boolean(touched.Tags && errors.Tags)}
                                        fullWidth
                                        helperText={touched.Tags && errors.Tags}
                                        label="Etiquetas"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="phone"
                                        value={values.Tags}
                                        variant="outlined"
                                        />
                                        <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        label="Descripción"
                                        margin="normal"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="password"
                                        value={values.password}
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