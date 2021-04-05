import * as Yup from 'yup'

const initialValues = {
  name: 'Juan',
  lastname: 'Fuentes',
  email: 'juanfuentes@unicauca.edu.co',
  password: 'oracle',
  confirmPassword: 'oracle',
  policy: false,
  isStudent: false,
  isTutor: true
}

const getValues = (values) => {
  return {
    user: {
      first_name: values.name,
      last_name: values.lastname,
      email: values.email,
      password: values.password
    }
  }
}

const validation = Yup.object().shape({
  name: Yup.string().max(255).required('Nombre es requerido'),
  lastname: Yup.string().max(255).required('Apellido es requerido'),
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
    .required('Correo Electrónico es requerido'),
  password: Yup.string().max(255).required('Contraseña es requerido'),
  confirmPassword: Yup.mixed()
    .test('iguales', 'Contraseñas no son iguales', function () {
      return this.parent.password === this.parent.confirmPassword
    })
    .required('Contraseña es requerido'),
  policy: Yup.boolean().oneOf([true], 'Este campo debe ser aceptado')
})

const logConst = {
  initialValues,
  getValues,
  validation
}

export default logConst
