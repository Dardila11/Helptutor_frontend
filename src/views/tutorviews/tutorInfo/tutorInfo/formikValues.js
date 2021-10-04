import * as Yup from 'yup'

let initialValues = {
  first_name: '',
  last_name: '',
  interest: '',
  methodology: '',
  skills: '',
  birthday: '',
  email: '',
  trajectory: ''
}

const putValues = (values) => {
  initialValues.first_name = values.user.first_name
  initialValues.last_name = values.user.last_name
  initialValues.interest = values.user.interest
  initialValues.methodology = values.methodology
  initialValues.skills = values.skills
  initialValues.birthday = values.user.birthday
  initialValues.email = values.user.email
  initialValues.trajectory = values.trajectory
}

const getValues = (values) => {
  return {
    user: {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      birthday: values.birthday,
      interest: values.interest,
      telephone: ''
    },
    score: 0,
    methodology: values.methodology,
    skills: values.skills,
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
})

const logFormikValues = {
  initialValues,
  getValues,
  validation,
  putValues
}

export default logFormikValues
