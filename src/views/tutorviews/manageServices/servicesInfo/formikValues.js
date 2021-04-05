import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    speciality: values.speciality,
    description: values.description,
    price: values.price
  }
}

const validation = Yup.object().shape({
  title: Yup.string().max(255),
  speciality: Yup.number().positive('Especialidad requierida'),
  description: Yup.string().max(255),
  price : Yup.number().positive('Precio requerido')
})

const logConst = {
  getValues,
  validation
}

export default logConst
