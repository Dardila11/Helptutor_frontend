import * as Yup from 'yup'

let initialValues = {
  first_name: '',
  last_name: '',
  birthday: '',
  email: '',
}

const putValues = (values) => {
  return {
    first_name: values.first_name,
    last_name: values.last_name,
    birthday: values.birthday,
    email: values.email
  }
}

const getValues = (values) => {
  return {
    user: {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      birthday: values.birthday,
    }
  }
}

const validation = Yup.object().shape({
  first_name: Yup.string().max(255)
    .test(
      'empty characters',
      'No puede estar vacio',
      (first_name) => !first_name || first_name.trim() !== ""
    ).required('Campo nombre es obligatorio')
    .required('Nombre es requerido'),
  last_name: Yup.string().max(255)
    .test(
      'empty characters',
      'No puede estar vacio',
      (last_name) => !last_name || last_name.trim() !== ""
    ).required('Campo Apellido es obligatorio')
    .required('Apellido es requerido'),
  birthday: Yup.string().max(255),
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
})

const logFormikValues = {
  initialValues,
  getValues,
  validation,
  putValues
}

export default logFormikValues
