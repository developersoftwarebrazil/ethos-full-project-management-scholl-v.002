export type  UserData = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  description?: string | null;
  birthday?: string |  null;
  phone?: string | null;
  address?: string | null;
  img?: string | null;
  subjects: any[];
};
