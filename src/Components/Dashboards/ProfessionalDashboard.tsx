"use client";

import { useState } from "react";
import Link from "next/link";
import UpdateForm from "../Forms/UpdateForm";

const ProfessionalDashboard = ({
  user,
  appointments,
  services,
}: ProfessionalDashboardProps) => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [formView, setFormView] = useState(false);

  console.log({ user });

  return (
    <main>
      <h2 className="p-2">
        Hola {user.first_name} {user.last_name} ({user.role})
      </h2>

      <div className="flex flex-col [&>a]:p-2">
        <h3 className="font-bold mt-4">Opciones del Profesional:</h3>
        <div className="flex space-x-4 border-b-2 pb-2 mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "appointments" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("appointments");
              setFormView(false);
            }}
          >
            Ver Turnos Pendientes
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "services" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => {
              setActiveTab("services");
              setFormView(false);
            }}
          >
            Ver Servicios
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

        {/* Tab para ver los turnos ocupados */}
        {/* {activeTab === "appointments" && (
          <div>
            <h4 className="text-lg font-semibold">Turnos Ocupados:</h4>
            {appointments.length > 0 ? (
              appointments.map((appointment: any) => (
                <div key={appointment.id} className="p-2 border-b">
                  <p>
                    <strong>Fecha:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Hora:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {appointment.client_name}
                  </p>
                </div>
              ))
            ) : (
              <p>No tienes ningún turno ocupado.</p>
            )}
          </div>
        )} */}

        {/* Tab para ver los servicios que ofrece */}
        {/* {activeTab === "services" && (
          <div>
            <h4 className="text-lg font-semibold">Servicios que Ofrezco:</h4>
            {services.length > 0 ? (
              services.map((service: any) => (
                <div key={service.id} className="p-2 border-b">
                  {service.name}
                </div>
              ))
            ) : (
              <p>No ofreces ningún servicio.</p>
            )}
          </div>
        )} */}

        {/* Tab para ver los datos del profesional */}
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

        {formView && <UpdateForm data={user} />}
      </div>
    </main>
  );
};

export default ProfessionalDashboard;
