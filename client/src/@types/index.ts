export type User = {
  _id: string,
  email: string,
  password: string, 
  username: string,
  firstName: string,
  lastName: string,
  birthdate: string,
  date: Date,
  bio: string,
  avatar: string
}

export type NewUser = {
  email: string,
  password: string, 
  username: string,
  date: Date,
  bio: string,
  avatar: string
}

export type NotOk = { 
  error: string;
}