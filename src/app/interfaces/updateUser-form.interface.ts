export interface UpdateUserForm {
  email: string
  nombre: string
  role: 'ADMIN_ROLE' | 'USER_ROLE'
}
