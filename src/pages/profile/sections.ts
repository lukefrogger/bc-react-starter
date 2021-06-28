export type Fields =
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'email'
  | 'phone'
  | 'currPwd'
  | 'oldPwd'
  | 'newPwd'

export interface FormField {
  name: Fields
  label: string
  required?: boolean
  inline?: boolean
  component?: any
  type?: string
}

export const generalSection: FormField[] = [
  {
    name: 'firstName',
    label: 'First name',
    required: true,
    inline: true,
  },
  {
    name: 'company',
    label: 'Company name',
    required: false,
    inline: true,
  },
  {
    name: 'lastName',
    label: 'Last name',
    required: true,
  },
]

export const contactSection: FormField[] = [
  {
    name: 'email',
    label: 'Email address',
    required: true,
    inline: true,
  },
  {
    name: 'phone',
    label: 'Phone number',
    required: false,
    inline: true,
  },
]

export const passwordSection: FormField[] = [
  {
    name: 'currPwd',
    label: 'Current password',
    required: true,
    type: 'password',
  },
  {
    name: 'oldPwd',
    label: 'Old password',
    required: true,
    inline: true,
    type: 'password',
  },
  {
    name: 'newPwd',
    label: 'New password',
    required: true,
    inline: true,
    type: 'password',
  },
]
