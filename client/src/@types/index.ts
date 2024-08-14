export type User = {
_id: string,
  email: string,
  password: string, // you would never actually have a password visible on the frontend
  username?: string
}

export type NotOk = { 
  error: string;
}