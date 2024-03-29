import * as Yup from 'yup'

let initialValues = {
  first_name: '',
  last_name: '',
  gender: 0,
  birthday: '',
  email: '',
  interest: ''
}

const putValues = (values) => {
  initialValues.first_name = values.first_name
  initialValues.last_name = values.last_name
  initialValues.gender = values.gender
  initialValues.birthday = values.birthday
  initialValues.email = values.email
  initialValues.interest = values.interest
}

const getValues = (values) => {
  return {
    user: {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      gender: values.gender,
      birthday: values.birthday,
      interest: values.interest
    }
  }
}

const validation = Yup.object().shape({
  first_name: Yup.string().max(255).required('Nombre es requerido'),
  last_name: Yup.string().max(255).required('Apellido es requerido'),
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
