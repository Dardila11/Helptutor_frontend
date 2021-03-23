import * as Yup from 'yup'

const getValues = (values) => {
  return {
    tags: values.tags,
    description: values.description,
    knowledge_area: values.speciality,
    user: 12
  }
}

const validation = Yup.object().shape({
  knowledge_area: Yup.number().positive('Área de conocimiento requerida'),
  speciality: Yup.number().positive('Especialidad requierida'),
  description: Yup.string().max(255),
  tags: Yup.string().max(255)
})

const logConst = {
  getValues,
  validation
}

export default logConst
