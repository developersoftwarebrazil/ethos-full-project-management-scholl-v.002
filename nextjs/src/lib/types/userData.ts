import { Role } from "./role";

export type UserData = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: Role[];
  description?: string | null;
  birthday: string | null;
  bloodType?: string | null;
  sex: string | null;
  phone?: string | null;
  address?: string | null;
  img?: string | null;
  subjects: any[];
};
