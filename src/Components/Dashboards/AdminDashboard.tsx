"use client";

import { useState } from "react";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import UpdateForm from "../Forms/UpdateForm";

interface AdminDashboardProps {
  user: any;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<
    TabType | null | "professionalData"
  >(null);
  const [formView, setFormView] = useState<boolean | number>(false);

  console.log(formView);

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
            className={`px-4 py-2 ${
              activeTab === "user" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("user");
              setFormView(false);
            }}
          >
            Usuarios
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "service" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("service");
              setFormView(false);
            }}
          >
            Servicios
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "appointment" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("appointment");
              setFormView(false);
            }}
          >
            Turnos
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "professional" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("professional");
              setFormView(false);
            }}
          >
            Profesionales
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "professionalData"
                ? "border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => {
              setActiveTab("professionalData");
              setFormView(false);
            }}
          >
            Ver Mis Datos
          </button>
        </div>

        {/* Receive and map an object with the activeTab data */}
        <div>
          {data[activeTab as TabType]?.length >= 1 ? (
            data[activeTab as TabType].map((user: any) => (
              <div
                className="flex gap-10 items-center my-10"
                key={user.user_id || user.id}
              >
                {user.first_name} {user.last_name} ({user.role})
                <button
                  onClick={() =>
                    setFormView(
                      formView === user.user_id ? false : user.user_id
                    )
                  }
                >
                  {" "}
                  Editar
                </button>
                {formView === user.user_id && <UpdateForm data={user} />}
              </div>
            ))
          ) : (
            <p>No hay datos disponibles para esta pestaña.</p>
          )}
        </div>

        {activeTab === "professionalData" && (
          <div>
            <h4 className="text-lg font-semibold">Mis Datos:</h4>
            <p>
              <strong>Nombre:</strong> {user.first_name}
            </p>
            <p>
              <strong>Apellido:</strong> {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => setFormView(!formView)}
              className="mt-4 p-2 flex w-fit bg-blue-500 text-white rounded"
            >
              Ver/Actualizar Mis Datos
            </button>
          </div>
        )}

        {formView === true && <UpdateForm data={user} />}
      </div>
    </main>
  );
};

export default AdminDashboard;
