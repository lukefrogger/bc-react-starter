export type Fields =
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'email'
  | 'phone'
  | 'currPwd'
  | 'confirmPwd'
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
    name: 'lastName',
    label: 'Last name',
    required: true,
    inline: true,
  },
  {
    name: 'company',
    label: 'Company name',
    required: false,
  },
]

export const contactSection: FormField[] = [
  {
    name: 'email',
    label: 'Email address',
    required: true,
    inline: true,
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Phone number',
    required: false,
    inline: true,
    type: 'tel',
  },
]

export const passwordSection: FormField[] = [
  {
    name: 'currPwd',
    label: 'Current password',
    required: false,
    type: 'password',
  },
  {
    name: 'newPwd',
    label: 'New password',
    required: false,
    inline: true,
    type: 'password',
  },
  {
    name: 'confirmPwd',
    label: 'Confirm password',
    required: false,
    inline: true,
    type: 'password',
  },
]
