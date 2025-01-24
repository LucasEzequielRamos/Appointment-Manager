// Base types

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slot: TimeSlot;
}

// User and roles

type Role = "PROFESSIONAL" | "CLIENT" | "ADMIN";

interface BaseUser {
  email: string;
  first_name: string;
  last_name: string;
  role?: Role;
  email_verified?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

interface User extends BaseUser {
  user_id?: number;
  password: string;
  client?: Client | null;
  professional?: Professional | null;
}

// Client and professional

interface Client {
  client_id: number;
  address: string;
  phone: string;
  coverage: string;
  other_coverage: string;
}

interface Professional {
  professional_id: number;
  services: Service[];
}

// Services

interface Service {
  name: string;
  duration: string;
  coverage?: string;
  availability: Availability[];
}

interface ServiceToRegister extends Service {
  email: string;
}

// DataForms and validations

interface FormPostDataToRegister extends Partial<Omit<User, "user_id" | "client" | "professional">> {
  availability?: Availability[];
  duration?: string;
  coverage?: string;
  confirm_password?: string;
  address?: string;
  phone?: string;
  other_coverage?: string;
}

interface ErrorsFormPostData extends Partial<Record<keyof FormPostDataToRegister, string>> {
  api?: string;
}

// Session and auth

interface Session {
  user: Pick<User, "name" | "email" | "id" | "last_name" | "role">;
  expires: string;
}

// Dashboards

interface ProfessionalDashboardProps {
  user: User;
  appointments?: any[]; // TODO: Define appointment type
  services?: Service[];
}

interface ClientDashboardProps {
  user: User;
  appointments?: any[];
}

// States and Tabs

type TabType = "user" | "service" | "appointment" | "professional";

interface DataState {
  user: any[]; // TODO: Define types
  service: any[];
  appointment: any[];
  professional: any[];
}

// Service form

type ServiceFormData = Pick<Service, "email" | "name" | "duration" | "coverage">;

type ServiceErrorsFormData = Record<string, string>;
