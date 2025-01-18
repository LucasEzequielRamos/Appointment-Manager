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

interface formPostDataToRegister{
  name?: string;
  availability?: [
    {
      day?: string;
      time_slot?: {
        start_time?: string;
        end_time?: string;
      };
    }
  ];
  duration?: string;
  coverage?: string;
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

interface ErrorsFormPostData{
  api?: string
  name?: string;
    availability?: string;
    duration?: string;
    coverage?: string;
    email?: string;
    password?: string ;
  confirm_password?:string ;
  first_name?: string ;
  last_name?: string ;
  address?: string ;
  phone?: string ;
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
interface ServiceToRegister {
  email: string;
  name: string;
  availability: [
    {
      day: string;
      time_slot: {
        start_time: string;
        end_time: string;
      };
    }
  ];
  duration: string;
  coverage?: string;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slot: TimeSlot;
}

type TabType = "user" | "service" | "appointment" | "professional" ;

interface DataState {
  user: any[];
  service: any[];
  appointment: any[];
  professional: any[];
}

interface ProfessionalDashboardProps {
  user: any;
  appointments?: any[];
  services?: any[];
}

interface ClientDashboardProps {
  user: any;
  appointments?: any[];
}