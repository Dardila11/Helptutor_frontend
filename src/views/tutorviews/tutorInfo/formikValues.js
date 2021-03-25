import * as Yup from 'yup'

let initialValues = {
  first_name: '',
  last_name: '',
  interests: '',
  methodology: '',
  skills: '',
  sex: '',
  birthday: '',
  email: ''
}

const putValues = (values) => {
  initialValues.first_name = values.user.first_name
  initialValues.last_name = values.user.last_name
  initialValues.interests = values.interest
  initialValues.methodology = values.methodology
  initialValues.skills = values.skills
  initialValues.sex = values.user.gender
  initialValues.birthday = values.user.birthday
  initialValues.email = values.user.email
}

const getValues = (values) => {
  return {
    first_name: values.first_name,
    last_name: values.last_name,
    interest: values.interest,
    methodology: values.methodology,
    skills: values.skills,
    gender: values.gender,
    birthday: values.birthday,
    email: values.email
  }
}

const validation = Yup.object().shape({
  first_name: Yup.string().max(255).required('Nombre es requerido'),
  last_name: Yup.string().max(255).required('Apellido es requerido'),
  interest: Yup.string().max(255).required('Intereses es requerido'),
  methodology: Yup.string().max(255).required('Metodólogia es requerido'),
  skills: Yup.string().max(255).required('Habilidades es requerido'),
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
