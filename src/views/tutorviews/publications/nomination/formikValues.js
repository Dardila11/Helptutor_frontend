import * as Yup from 'yup'

const getValues = (values) => {
  return {
    price: values.price,
    description: values.description,
    offer: values.offer,
  }
}

const validation = Yup.object().shape({
  price: Yup.number()
    .moreThan(-1, 'El precio debe ser positivo')
    .required(
      'El precio es obligatorio, si no deseas cobrar agrega cero(0) como precio'
    ),
  description: Yup.string().max(255)
})

const logConst = {
  getValues,
  validation
}

export default logConst
