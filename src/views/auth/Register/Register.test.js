import React from 'react'
import { render, fireEvent, screen, cleanup } from 'src/test-utils'
import RegisterView from 'src/views/auth/Register/RegisterView'

afterEach(cleanup)

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

it('renders the connected app with initialState', () => {
  render(<RegisterView />, {
    initialState: { auth: { isAuthenticated: false } }
  })

  expect(screen.queryByLabelText('Correo electrónico')).toBeInTheDocument()
  expect(screen.queryByLabelText('Contraseña')).toBeInTheDocument()
})
