import * as Yup from 'yup'

let initialValues = {
  title: "",
  description: "",
  price: 0,
  user: 0,
  speciality: -1
}

const putValues = (values) => {
  initialValues.title = values.title
  initialValues.speciality = values.knowledge_area_tutor
  initialValues.description = values.description
  initialValues.price = values.price
  initialValues.user = values.tutor.id
}

const getValues = (values) => {
  return {
    title: values.title,
    speciality: values.speciality,
    description: values.description,
    price: values.price,
    user: values.user
  }
}

const validation = Yup.object().shape({
  title: Yup.string().max(255),
  speciality: Yup.number().positive('Especialidad requierida'),
  description: Yup.string().max(255),
  price: Yup.number().positive('Precio requerido')
})

const logConst = {
  initialValues,
  getValues,
  validation,
  putValues
}

export default logConst
