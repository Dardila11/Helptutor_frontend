import React from 'react'
import { render, fireEvent, screen, cleanup, waitFor } from 'src/test-utils'
import userEvent from '@testing-library/user-event'
import RegisterView from 'src/views/auth/Register/RegisterView'

afterEach(cleanup)

let firstname
let lastname
let email
let password
let confirmPassword
let checkboxPolicy
let btnRegister
let role = 'tutor'

beforeEach(() => {
  /**
   * render our component with a initialState.
   * this render comes from our test-util.js
   */
  render(<RegisterView />, {
    initialState: { auth: { isAuthenticated: false } }
  })

   firstname = screen.getByTestId('firstname')
   lastname = screen.getByTestId('lastname')
   email = screen.getByTestId('email')
   password = screen.getByTestId('password')
   confirmPassword = screen.getByTestId('confirmPassword')
   checkboxPolicy = screen.getByTestId('checkboxPolicy')
   btnRegister = screen.getByTestId('btn-register')
})

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('RegisterView Tutor', () => {
  /* it('renders registerView form', () => {
    expect(screen.getByTestId('register-form')).toBeInTheDocument()
  }) */
  /* it('user checks checkboxPolicy', () => {
    // obtenemos la referencia de nuestro checkbox que ya está renderizado
    const checkboxPolicy = screen.getByTestId('checkboxPolicy')
    // se espera que el checkbox no este chequeado
    expect(checkboxPolicy).not.toBeChecked()
    // cuando el usuario le da click
    userEvent.click(checkboxPolicy)
    // se espera que el checkbox sea chequeado
    expect(checkboxPolicy).toBeChecked()
  }) */
  it('datos correctos', async () => {
    expect(firstname).toHaveValue('')
    expect(lastname).toHaveValue('')
    expect(email).toHaveValue('')
    expect(password).toHaveValue('')
    expect(confirmPassword).toHaveValue('')
    expect(checkboxPolicy).not.toBeChecked()

    fireEvent.change(firstname, { target: { value: 'Dan' } })
    fireEvent.change(lastname, { target: { value: 'Ardila' } })
    fireEvent.change(email, { target: { value: 'dardila+10@unicauca.edu.co' } })
    fireEvent.change(password, { target: { value: 'qwerty123' } })
    fireEvent.change(confirmPassword, { target: { value: 'qwerty123' } })

    userEvent.click(checkboxPolicy)
    expect(checkboxPolicy).toBeChecked()

    fireEvent.click(btnRegister)

    await waitFor(() => {
      // ya que los demas campos están vacios, deberia mostrar los mensajes de error
      // en por lo menos uno de los campos que está vacio.
      // TODO nos falta configurar la llamada al api o algo asi
      //expect(screen.getByText('Debes seleccionar un rol')).toBeInTheDocument()
    })
  })

  it.todo('Funciona el botón de acceder con google')
  it.todo('Accede con cuenta de google correctamente')
  it.todo('Accede con cuenta de google y la cuenta no es válida')
  it('Falta el apellido', async () => {
    /* const firstname = screen.getByTestId('firstname')
    const btnRegister = screen.getByTestId('btn-register') */

    fireEvent.change(firstname, {
      target: {
        value: 'Dan'
      }
    })
    expect(firstname).toHaveValue('Dan')
    // cuando el usuario le da click en registrarse
    fireEvent.click(btnRegister)

    await waitFor(() => {
      // ya que los demas campos están vacios, deberia mostrar los mensajes de error
      // en por lo menos uno de los campos que está vacio.
      expect(screen.getByText('Apellido es requerido')).toBeInTheDocument()
    })
  })
  it('No se marca el checkbox términos y condiciones', async () => {
    fireEvent.change(firstname, { target: { value: 'Dan' } })
    fireEvent.change(lastname, { target: { value: 'Ardila' } })
    fireEvent.change(email, { target: { value: 'dardila+10@unicauca.edu.co' } })
    fireEvent.change(password, { target: { value: 'qwerty123' } })
    fireEvent.change(confirmPassword, { target: { value: 'qwerty123' } })

    fireEvent.click(btnRegister)

    await waitFor(() => {
      expect(
        screen.getByText('Este campo debe ser aceptado')
      ).toBeInTheDocument()
    })
  })
  it('El correo no tiene el @unicauca.edu.co', async () => {
    fireEvent.change(firstname, { target: { value: 'Dan' } })
    fireEvent.change(lastname, { target: { value: 'Ardila' } })
    fireEvent.change(email, { target: { value: 'dardila+10@gmail.com' } })
    fireEvent.change(password, { target: { value: 'qwerty123' } })
    fireEvent.change(confirmPassword, { target: { value: 'qwerty123' } })

    fireEvent.click(btnRegister)

    await waitFor(() => {
      expect(
        screen.getByText('Email debe ser @unicauca.edu.co')
      ).toBeInTheDocument()
    })
  })
  it('No coinciden las contraseñas', async () => {
    fireEvent.change(firstname, { target: { value: 'Dan' } })
    fireEvent.change(lastname, { target: { value: 'Ardila' } })
    fireEvent.change(email, { target: { value: 'dardila+10@gmail.com' } })
    fireEvent.change(password, { target: { value: 'qwerty123' } })
    fireEvent.change(confirmPassword, { target: { value: 'qwerty12312' } })

    fireEvent.click(btnRegister)

    await waitFor(() => {
      expect(screen.getByText('Contraseñas no son iguales')).toBeInTheDocument()
    })
  })
})

describe('Register View - Estudiante', () => {
  it.todo('el rol estudiante seleccionado')
  it.todo('navega el view del estudiante')
  
})