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
  makeStyles,
  IconButton, 
  Paper
} from '@material-ui/core'
import Badge from '@material-ui/core/Badge';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { Formik } from 'formik'
import formikValues from './formikValues'

import EditProfileViewSkeleton from 'src/components/skeletons/EditProfileViewSkeleton'

import Page from 'src/components/Page';
import { useAuthState } from 'src/context/context';
import { useStudentInfo, useUpdateStudentInfo } from 'src/hooks/StudentHooks/useStudentInfo'
import { capitalize } from 'lodash-es';


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



const StudentEditInfoView = () => {
  const userId = useAuthState().user.id
  const userInfoQuery = useStudentInfo(userId)
  console.log(userInfoQuery)
  const mutation = useUpdateStudentInfo()
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = useState(null)

  let initialValues = {
    first_name: userInfoQuery.data.user.first_name,
    last_name: userInfoQuery.data.user.last_name,
    birthday: userInfoQuery.data.user.birthday,
    email: userInfoQuery.data.user.email,
    interest: userInfoQuery.data.user.interest
  }
  console.log(initialValues)

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
  return (
    <Page  title="Editar perfil">
      {userInfoQuery.status === 'success' ? (
        <Paper className={classes.infoView} elevation={3}>
        <Card className={classes.root}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              //validationSchema={formikValues.validation}
              onSubmit={(values) => {
                let jsonValues = formikValues.getValues(values)
                //updateStudent(jsonValues, file)
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
                      Información del Estudiante
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
                                  src={preview === null ? userInfoQuery.data.user.photo : preview}
                                >
                                  <Typography variant='h1'>
                                    <b>{capitalize(userInfoQuery.data.user.first_name[0])}</b>
                                  </Typography>
                                  </Avatar>
                              </Badge>
                            </IconButton>
                      </Box>
                    </Grid>
                    <Grid container item xs={9}>
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
                          {/* <FormControl
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
                          </FormControl> */}
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
      ) : (
        <EditProfileViewSkeleton/>
      )}
    </Page>
  )
}

/* const mapStateToProps = (state) => ({
  user: state.auth.user,
  userInfo: state.studentInfo.userInfo,
  requestInProgress: state.studentInfo.requestInProgress
}) */

/* export default connect(mapStateToProps, {
  getStudentInfo,
  updateStudent
})(StudentEditInfoView) */

export default StudentEditInfoView
