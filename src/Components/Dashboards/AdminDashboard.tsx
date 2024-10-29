"use client";

import { useState } from "react";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard = ({
  user,
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType | null >(null);
  
  const { data } = useFetchData(activeTab);

  return (
    <main>
      <h2 className="p-2">
        Hola {user.first_name} {user.last_name} ({user.role})
      </h2>

      <div className="flex flex-col [&>a]:p-2">
        <h3 className="font-bold">Acciones administrativas:</h3>
        <Link href={`/auth/register`}>Registrar Cliente</Link>
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
            className={`px-4 py-2 ${activeTab === "user" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("user")}
          > 
            Usuarios
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "service" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("service")}
          >
            Servicios
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "appointment" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("appointment")}
          >
            Turnos
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "professional" ? "border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setActiveTab("professional")}
          >
            Profesionales
          </button>
        </div>

        {/* Receive and map an object with the activeTab data */}
        <div>
          {data[activeTab as TabType]?.length >= 1 ? (
            data[activeTab as TabType].map((user: any) => (
              <div key={user.user_id || user.id}>
                {user.first_name} {user.last_name}
              </div>
            ))
          ) : (
            <p>No hay datos disponibles para esta pestaña.</p>
          )}
        </div>

      </div>
    </main>
  );
};

export default AdminDashboard;
