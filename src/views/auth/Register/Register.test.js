import React from 'react'
import { render, fireEvent, screen, cleanup } from 'src/test-utils'
import userEvent from '@testing-library/user-event'
import RegisterView from 'src/views/auth/Register/RegisterView'

afterEach(cleanup)

beforeEach(() => {
  /**
   * render our component with a initialState.
   * this render comes from our test-util.js
   */
  render(<RegisterView />, {
    initialState: { auth: { isAuthenticated: false } }
  })
})

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

describe('RegisterView Test', () => {
  it('renders registerView form', () => {
    expect(screen.getByTestId('register-form')).toBeInTheDocument()
  })

  it('user checks checkboxPolicy', () => {
    // obtenemos la referencia de nuestro checkbox que ya está renderizado
    const checkboxPolicy = screen.getByTestId('checkboxPolicy')
    // se espera que el checkbox no este chequeado
    expect(checkboxPolicy).not.toBeChecked()
    // cuando el usuario le da click
    userEvent.click(checkboxPolicy)
    // se espera que el checkbox sea chequeado
    expect(checkboxPolicy).toBeChecked()
  })
  it('user inputs data to form', () => {
    const firstname = screen.getByTestId('firstname')
    const lastname = screen.getByTestId('lastname')
    const email = screen.getByTestId('email')
    const password = screen.getByTestId('password')
    const confirmPassword = screen.getByTestId('confirmPassword')
    const btnRegister = screen.getByTestId('btn-register')
    
    expect(firstname).toHaveValue('')
    expect(lastname).toHaveValue('')
    expect(email).toHaveValue('')
    expect(password).toHaveValue('')
    expect(confirmPassword).toHaveValue('')

    // cuando el usuario digita en un textfield
    fireEvent.change(firstname, {
      target: {
        value: 'Dan'
      }
    })
    expect(firstname).toHaveValue('Dan')
    // cuando el usuario le da click en registrarse
    fireEvent.click(btnRegister)
    // ya que los demas campos están vacios, deberia mostrar los mensajes de error
    // en por lo menos uno de los campos que está vacio.
    expect(screen.getByText("Apellido es requerido")).toBeInTheDocument()

  })

})
