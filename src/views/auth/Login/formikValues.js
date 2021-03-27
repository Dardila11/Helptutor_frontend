import * as Yup from 'yup'

const initialValues = {
  email: 'juanfuentes@unicauca.edu.co',
  password: 'Colombia20',
}

const getValues = (values) => {
  return {
    email: values.email,
    password: values.password
  }
}

const validation = Yup.object().shape({
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
})

const logConst = {
  initialValues,
  getValues,
  validation
}

export default logConst
