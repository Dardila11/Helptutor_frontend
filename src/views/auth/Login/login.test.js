import React from 'react'
import { render, fireEvent, screen } from 'src/test-utils'
import LoginView from 'src/views/auth/Login'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}))

it('renders the connected app with initialState', () => {
  render(<LoginView />, { initialState: { auth: { isAuthenticated: false } } })

  expect(screen.queryByLabelText('Email')).toBeInTheDocument()
  expect(screen.queryByLabelText('Contraseña')).toBeInTheDocument()
})
