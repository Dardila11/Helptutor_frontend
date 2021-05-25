import * as Yup from 'yup'

let initialValues = {
  first_name: '',
  last_name: '',
  interest: '',
  methodology: '',
  skills: '',
  gender: 0,
  birthday: '',
  email: '',
  trajectory: ''
}

const putValues = (values) => {
  initialValues.first_name = values.first_name
  initialValues.last_name = values.last_name
  initialValues.interest = values.interest
  initialValues.methodology = values.methodology
  initialValues.skills = values.skills
  initialValues.gender = values.gender
  initialValues.birthday = values.birthday
  initialValues.email = values.email
  initialValues.trajectory = values.trajectory
}

const getValues = (values) => {
  return {
    user: {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      gender: values.gender,
      birthday: values.birthday,
      telephone: ''
    },
    score: 0,
    methodology: values.methodology,
    skills: values.skills,
    interest: values.interest,
    trajectory: values.trajectory
  }
}

const validation = Yup.object().shape({
  first_name: Yup.string().max(255).required('Nombre es requerido'),
  last_name: Yup.string().max(255).required('Apellido es requerido'),
  interest: Yup.string().max(255).required('Intereses es requerido'),
  methodology: Yup.string().max(255).required('Metodólogia es requerido'),
  skills: Yup.string().max(255).required('Habilidades es requerido'),
  trajectory: Yup.string().max(255).required('Experiencia es requerido'),
  gender: Yup.string().max(255).required('Sexo es requerido'),
  birthday: Yup.string().max(255).required('Fecha de nacimiento es requerido'),
  email: Yup.string()
    .email('Debe ser un email valido')
    .test('Valido', 'Email debe ser @unicauca.edu.co', function () {
      if (this.parent.email !== undefined) {
        var email = this.parent.email.toLowerCase()
        if (email !== '') {
          return email.substr(email.length - 15) === 'unicauca.edu.co'
        }
      }
    })
    .max(255)
    .required('Correo Electrónico es requerido')

  /* country: Yup.string().max(255).required('Pais es requerido'),
  phone: Yup.string().max(255).required('Teléfono es requerido') */
  /* password: Yup.string().max(255).required('Contraseña es requerido'),
  confirmPassword: Yup.mixed()
    .test('iguales', 'Contraseñas no son iguales', function () {
      return this.parent.password === this.parent.confirmPassword
    })
    .required('Contraseña es requerido') */
})

const logFormikValues = {
  initialValues,
  getValues,
  validation,
  putValues
}

export default logFormikValues