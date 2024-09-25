export type UserPayloadObject = {
  name: string
  email: string
  token: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

 
export type Client = {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  chat_id: string;
  username: string;
  role: string;
  status: string;
  availability: string;
  skills:  [];
  experience: string;


}

export type UserForm = {
  name: string
  email: string
}

// types.ts

export interface User {
  id: string; // Adjust the type as per your API response
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  chat_id: string,
  username: string,
  role: string,
  status: string,
  availability: string,
}

// Optionally, you can define the registration user type without id
export type RegisterUser = Omit<User, 'id'>;
