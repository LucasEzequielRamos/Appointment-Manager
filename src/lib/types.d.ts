type Session =  {
user:{
    name: string,
    email: string,
    id: string,
    last_name: string,
    role: string,
},
expires: string
}

interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified?: null | boolean; 
  role?: "PROFESSIONAL" | "CLIENT" | "ADMIN"; 
  password: string; 
  created_at?: string; 
  updated_at?: string; 
  client?: Client | null; 
  professional?: Professional | null; 
}

interface UserToRegister{
  email?: string ;
  password?: string ;
  confirm_password?:string ;
  first_name?: string ;
  last_name?: string ;
  address?: string ;
  phone?: string ;
  coverage?: string ;
  other_coverage?: string ;
}

interface Professional {
  professional_id: number;
  services: Service[];
}

interface Client {
  client_id: number;
  address: string;
  phone: string;
  coverage: string;
  other_coverage: string;
}
interface Service {
  id: number;
  name: string;
  duration: string; 
  coverage: string;
  professional_id: number;
  availability: Availability[];
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slot: TimeSlot;
}