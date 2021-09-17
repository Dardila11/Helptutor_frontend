import React, { useState, useEffect } from 'react'
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
  makeStyles,
  IconButton, 
  Paper
} from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Formik } from 'formik'
import formikValues from './formikValues'
import useTutorInfo from 'src/hooks/TutorHooks/useTutorInfo'
import { useAuthState } from 'src/context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    borderRadius: '20px'
  },
  selectControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  infoView: {
    borderRadius: '20px'
  },
  progress: {
    marginTop: theme.spacing(5),
    float: 'center'
  },
  inputs: {
    '& > *': {
      marginRight: theme.spacing(1)
    },
    '& >:last-child': {
      marginRight: 0
    }
  },
  input: {
    display: 'none'
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    color: theme.palette.getContrastText('#1769aa'),
    backgroundColor: '#1769aa'
  },
  iconbutton: {
    backgroundColor: '#1190CB',
    color: '#ffff'
  }
}))

const EditInfoView = (props) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const user = useAuthState().user
  const {data, isLoading} = useTutorInfo(user.id)
  
  useEffect(() => {
    formikValues.putValues(data)
  }, [data])

  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0])

     let reader = new FileReader();
  
     reader.readAsDataURL(e.target.files[0]);
   
     reader.onload = function(){
       setPreview(reader.result)
     } 
  }

  const handleInput = () => {
    const element = document.getElementById('fileInput')
    element.click()
  }

  const classes = useStyles()
  return isLoading ? (
    <>
      <LinearProgress />
    </>
  ) : (
      <Paper className={classes.infoView} elevation={3}>
        <Card className={classes.root}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Formik
              enableReinitialize
              initialValues={formikValues.initialValues}
              validationSchema={formikValues.validation}
              onSubmit={(values) => {
                let jsonValues = formikValues.getValues(values)
                console.log(jsonValues)
                console.log(file)
                //updateTutor(jsonValues, file)
              }}>
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3} textAlign="center">
                    <Typography color="textPrimary" variant="h4">
                      Información
                    </Typography>
                  </Box>
                  <Grid container>
                    <Grid item xs={3}>
                      <Box display="flex" flexDirection='row' justifyContent='center'>                        
                        <input id='fileInput' accept="image/png, image/jpeg" type='file' onChange={fileSelectedHandler} className={classes.input}/>
                          <IconButton style={{paddingTop: 0}}onClick={handleInput}>
                              <Badge
                                overlap="circle"
                                badgeContent={<IconButton className={classes.iconbutton} variant='outlined' color='primary'><EditRoundedIcon fontSize='small'/></IconButton>}
                              >
                                <Avatar
                                  id='avatarPhoto'
                                  className={classes.avatar}
                                  alt="my-avatar"
                                  src={preview === null ? user.photo : preview}
                                >
                                  <Typography variant='h1'>
                                    <b>{user.first_name[0]}</b>
                                  </Typography>
                                  </Avatar>
                              </Badge>
                            </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      <Box className={classes.inputs} display='flex' flexDirection='row'>
                        <TextField
                          id="txt_firstname"
                          error={Boolean(touched.first_name && errors.first_name)}
                          fullWidth
                          helperText={touched.first_name && errors.first_name}
                          label="Nombre"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="first_name"
                          value={values.first_name}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'firstname'
                          }}
                        />
                        <TextField
                          id="txt_lastname"
                          error={Boolean(touched.last_name && errors.last_name)}
                          fullWidth
                          helperText={touched.last_name && errors.last_name}
                          label="Apellido"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="last_name"
                          value={values.last_name}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'lastname'
                          }}
                        />
                        </Box>
                        <Box className={classes.inputs} display='flex' flexDirection='row'>
                          <FormControl
                            variant="outlined"
                            className={classes.selectControl}
                            error={Boolean(touched.gender && errors.gender)}
                            helpertext={touched.gender && errors.gender}
                            fullWidth
                            >
                            <InputLabel id="select-gender-label"> Género </InputLabel>
                            <Select
                              labelId="select-gender-label"
                              id="select_gender"
                              value={values.gender}
                              name="gender"
                              onChange={handleChange}
                              label="Género"
                              inputProps={{
                                'data-testid': 'gender'
                              }}>
                              <MenuItem key={3} value={3}>
                                --
                              </MenuItem>
                              <MenuItem key={0} value={0}>
                                Femenino
                              </MenuItem>
                              <MenuItem key={1} value={1}>
                                Masculino
                              </MenuItem>
                              <MenuItem key={2} value={2}>
                                Otro
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            id="txt_birthday"
                            className={classes.birthday}
                            error={Boolean(touched.birthday && errors.birthday)}
                            fullWidth
                            helperText={touched.birthday && errors.birthday}
                            label="Fecha de Nacimiento"
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="date"
                            name="birthday"
                            value={values.birthday}
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true
                            }}
                            inputProps={{
                              'data-testid': 'birthday'
                            }}
                          />
                          <TextField
                            id="txt_email"
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            disabled
                            helperText={touched.email && errors.email}
                            label="Correo Electrónico"
                            margin="normal"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            value={values.email}
                            variant="outlined"
                            inputProps={{
                              'data-testid': 'email'
                            }}
                          />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>           
                      <Box className={classes.inputs} display="flex">
                        <TextField
                          id="txt_interests"
                          error={Boolean(touched.interest && errors.interest)}
                          fullWidth
                          helperText={touched.interest && errors.interest}
                          label="Mis intereses"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="interest"
                          value={values.interest}
                          multiline={true}
                          rows={5}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'interests'
                          }}
                        />
                        <TextField
                          id="txt_methodology"
                          error={Boolean(touched.methodology && errors.methodology)}
                          fullWidth
                          helperText={touched.methodology && errors.methodology}
                          label="Metodología"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="methodology"
                          value={values.methodology}
                          multiline={true}
                          rows={5}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'methodology'
                          }}
                        />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>           
                      <Box className={classes.inputs} display="flex">
                        <TextField
                          id="txt_skills"
                          error={Boolean(touched.skills && errors.skills)}
                          fullWidth
                          helperText={touched.skills && errors.skills}
                          label="Habilidades"
                          margin="normal"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="skills"
                          value={values.skills}
                          multiline={true}
                          rows={5}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'skills'
                          }}
                        />
                        <TextField
                          id="txt_trajectory"
                          error={Boolean(touched.trajectory && errors.trajectory)}
                          fullWidth
                          helperText={touched.trajectory && errors.trajectory}
                          label="Experiencia"
                          margin="normal"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="trajectory"
                          value={values.trajectory}
                          multiline={true}
                          rows={5}
                          variant="outlined"
                          inputProps={{
                            'data-testid': 'trajectory'
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display='flex' justifyContent='center'>
                        <Button
                          id="btn_updateTutor"
                          color="primary"
                          //disabled={isSubmitting}
                          size="large"
                          type="submit"
                          variant="contained"
                          data-testid="btn-update">
                          Actualizar
                        </Button>
                      </Box>
                  </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Box>
        </Card>
      </Paper>
  )
}

export default EditInfoView
