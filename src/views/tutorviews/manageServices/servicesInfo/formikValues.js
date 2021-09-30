import * as Yup from 'yup'

let initialValues = {
  title: "",
  description: "",
  price: 0,
  speciality: -1
}

const getValues = (values) => {
  return {
    title: values.title,
    knowledge_area_tutor: values.speciality,
    description: values.description,
    price: values.price,
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
  validation
}

export default logConst
