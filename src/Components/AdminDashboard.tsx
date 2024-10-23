"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminDashboardProps {
  user: any;
  users: any[];
  services: any[];
  appointments: any[];
  professionals: any[];
}

const AdminDashboard = ({
  user,
  users,
  services,
  appointments,
  professionals,
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("usuarios");

  return (
    <main>
      <h2 className="p-2">
        Hola {user.first_name} {user.last_name} ({user.role})
      </h2>

      <div className="flex flex-col [&>a]:p-2">
        <h3 className="font-bold">Acciones administrativas:</h3>
        <Link href={`/auth/admin-to-register/professional`}>
          Registrar Profesional
        </Link>
        <Link href={`/auth/admin-to-register/admin`}>
          Registrar Administrador
        </Link>
        <Link href={`/auth/admin-to-register/service`}>Registrar Servicio</Link>
        <Link href={`/auth/admin-to-register/appointments`}>
          Registrar Turno
        </Link>
        <Link href={`/auth/admin-to-register/appointments`}>
          Consultar Turnos
        </Link>

        <h3 className="font-bold mt-4">Ver datos:</h3>
        <div className="flex space-x-4 border-b-2 pb-2 mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "usuarios" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("usuarios")}
          >
            Usuarios
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "servicios" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("servicios")}
          >
            Servicios
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "turnos" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("turnos")}
          >
            Turnos
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "profesionales" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("profesionales")}
          >
            Profesionales
          </button>
        </div>

        {activeTab === "usuarios" && (
          <div>
            <h4 className="text-lg font-semibold">Usuarios:</h4>
            {users.length > 1 ? (
              users.map((user: any) => (
                <div key={user.user_id}>
                  {user.first_name} {user.last_name}
                </div>
              ))
            ) : (
              <p>No hay ningun usuario registrado</p>
            )}
          </div>
        )}

        {activeTab === "servicios" && (
          <div>
            <h4 className="text-lg font-semibold">Servicios:</h4>
            {services.length > 1 ? (
              services.map((service: any) => (
                <div key={service.id}>{service.name}</div>
              ))
            ) : (
              <p>No hay ningun servicio registrad</p>
            )}
          </div>
        )}

        {activeTab === "turnos" && (
          <div>
            <h4 className="text-lg font-semibold">Turnos:</h4>
            {appointments.length > 1 ? (
              appointments.map((appointment: any) => (
                <div key={appointment.id}>{appointment.date}</div>
              ))
            ) : (
              <p>No hay ningun turno</p>
            )}
          </div>
        )}

        {activeTab === "profesionales" && (
          <div>
            <h4 className="text-lg font-semibold">Profesionales:</h4>
            {professionals.length > 1 ? (
              professionals.map((professional: any) => (
                <div key={professional.id}>
                  {professional.first_name} {professional.last_name}
                </div>
              ))
            ) : (
              <p>No hay ningun profesioal registrado</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
