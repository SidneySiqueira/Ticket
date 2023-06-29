export interface EventProps {
  adress: string;
  date: string;
  description: string;
  local: string;
  name: string;
  price: string;
  time: string;
}

export interface EventsProps {
  [""]: EventProps
}

export interface InfoProps {
  cellPhone: string;
  email: string;
  isAdmin: boolean;
  name: string;
  password: string;
}

export interface UsersProps {
  password: string;
  email: string;
  [""]: InfoProps;
}
