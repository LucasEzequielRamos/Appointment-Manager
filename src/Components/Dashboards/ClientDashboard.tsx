"use client";

import { useState } from "react";
import Link from "next/link";
import UpdateClientForm from "../Forms/UpdateClientForm";

interface ClientDashboardProps {
  user: any;
  appointments?: any[];
}

const ClientDashboard = ({ user, appointments }: ClientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("myAppointments");
  const [formView, setFormView] = useState(false);

  return (
    <main>
      <h2 className="p-2">
        Hola {user.first_name} {user.last_name} ({user.role})
      </h2>

      <div className="flex flex-col [&>a]:p-2">
        <h3 className="font-bold mt-4">Opciones del cliente:</h3>
        <div className="flex space-x-4 border-b-2 pb-2 mb-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "myAppointments" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("myAppointments")}
          >
            Ver Mis Turnos
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "newAppointment" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("newAppointment")}
          >
            Sacar Nuevo Turno
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "misDatos" ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("misDatos")}
          >
            Ver Mis Datos
          </button>
        </div>

        {/* Tab for Viewing Appointments */}
        {/* {activeTab === "myAppointments" && (
          <div>
            <h4 className="text-lg font-semibold">Mis Turnos:</h4>
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
                    <strong>Servicio:</strong> {appointment.service}
                  </p>
                </div>
              ))
            ) : (
              <p>No tienes ningún turno reservado.</p>
            )}
          </div>
        )} */}

        {/* Tab for Booking a New Appointment */}
        {activeTab === "newAppointment" && (
          <div>
            <h4 className="text-lg font-semibold">Sacar Nuevo Turno:</h4>
            <Link href="/appointments/new">
              <button className="mt-4 p-2 bg-blue-500 text-white rounded">
                Reservar Nuevo Turno
              </button>
            </Link>
          </div>
        )}

        {/* Tab for Viewing User Data */}
        {activeTab === "misDatos" && (
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
            <p>
              <strong>Direccion:</strong> {user.client.address}
            </p>
            <p>
              <strong>Cobertura:</strong> {user.client.coverage}
            </p>
            <p>
              <strong>Numero de contacto:</strong> {user.client.phone}
            </p>
            <button
              onClick={() => setFormView(!formView)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Ver/Actualizar Mis Datos
            </button>
          </div>
        )}

        {formView && <UpdateClientForm data={user} />}
      </div>
    </main>
  );
};

export default ClientDashboard;
