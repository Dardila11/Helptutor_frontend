import * as Yup from 'yup'

const getValues = (values) => {
  return {
    title: values.title,
    description: values.description,
    knowledge_area: values.knowledge_area
  }
}

const validation = Yup.object().shape({
  knowledge_area: Yup.number()
    .test(
      'invalid knowledge_area', 
      'No puede estar vacio',
      (knowledge_area) => knowledge_area != -1)
    .required('Campo categoria es obligatorio'),
  title: Yup.string()
    .min(10, 'Titulo debe tener por lo menos 10 caracteres')
    .max(255, 'Titulo debe tener un maximo de 255 caracteres')
    /* .test('only numbers', 'no puede ser solo numeros', (title) => title.match(/^\d+\.\d+$/) !== null ) */
    .test(
      'empty characters',
      'No puede estar vacio',
      (title) => !title || title.trim() !== ""
    )
    .required('Titulo es obligatorio'),
  description: Yup.string()
    .min(10, 'Descripción debe tener por lo menos 10 caracteres')
    .max(255, 'Descripción debe tener un maximo de 255 caracteres')
    .test(
      'empty characters',
      'No puede estar vacio',
      (description) => !description || description.trim() !== ""
    )
    .required('Descripción es obligatorio')
})

const logConst = {
  getValues,
  validation
}

export default logConst
