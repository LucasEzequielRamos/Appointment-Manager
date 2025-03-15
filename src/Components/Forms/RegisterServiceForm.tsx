"use client";

import React, { useState } from "react";
import useService from "@/hooks/useService";
import { arrDays } from "@/lib/mock";
import ModalButton from "../Buttons/ModalButton";

const RegisterServiceForm = () => {
  const {
    handleChange,
    formPostData,
    handleSubmit,
    handleChangeTimeSlots,
    availability,
    errors,
  } = useService({
    apiUrl: `/api/service`,
    userType: "SERVICE",
    method: "POST",
  });

  // Modal status
  const [modalFeedback, setModalFeedback] = useState<{
    status: 'open' | 'closed';
    title: string;
    body: string | React.ReactNode;
  }>({
    status: "closed",
    title: "",
    body: "",
  });

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = await handleSubmit(e);
    if (validation) {
      console.log("validation", validation);
      setModalFeedback({
        status: "open",
        title: "Exito",
        body: "El servicio se ha registrado correctamente",
      });
    } else if (errors.api) {
      setModalFeedback({
        status: "open",
        title: "Error",
        body: errors.api,
      });
    }
  };

  return (
    <>
      <form
        // onSubmit={handleSubmit}
        onSubmit={handleFeedbackSubmit}
        className="form-control my-10 mx-auto p-10 border border-accent-200 rounded md:w-1/3"
      >
        {errors.api && <p className="text-red-700">{errors.api}</p>}
        <div>
          <label className="block text-sm font-medium">
            Email del profesional
          </label>
          <input
            name="email"
            value={formPostData?.email}
            type="email"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-700">{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <label className="label">Seleccione un servicio</label>
          <select
            name="name"
            value={formPostData?.name}
            onChange={handleChange}
            className="select w-full max-w-xs select-bordered"
          >
            <option>Servicio 1</option>
            <option>Servicio 2</option>
            <option>Servicio 3</option>
            <option>Servicio 4</option>
          </select>
          {errors.name && <p className="text-red-700">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className="label">Seleccione una cobertura</label>
          <select
            name="coverage"
            value={formPostData?.coverage}
            onChange={handleChange}
            className="select w-full max-w-xs select-bordered"
          >
            <option>Sin cobertura</option>
            <option>Bronce</option>
            <option>Plata</option>
            <option>Oro</option>
          </select>
          {errors.coverage && <p className="text-red-700">{errors.coverage}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="duration" className="label">
            Duracion del servicio
          </label>
          <select
            name="duration"
            value={formPostData?.duration}
            id="timeFragmentSelect"
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option value="">Seleccione un tiempo</option>
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">1 hora</option>
            <option value="75">1 hora 15 min</option>
            <option value="90">1 hora 30 min</option>
            <option value="105">1 hora 45 min</option>
            <option value="120">2 horas</option>
            <option value="135">2 horas 15 min</option>
            <option value="150">2 horas 30 min</option>
            <option value="165">2 horas 45 min</option>
            <option value="180">3 horas</option>
          </select>
          {errors.duration && <p className="text-red-700">{errors.duration}</p>}
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold">Disponibilidad</h3>
          {arrDays.map(day => (
            <div key={day.id} className="flex items-center">
              <input
                type="checkbox"
                id={day.id + "Availability"}
                name={day.id}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <label className="label" htmlFor={day.id}>
                {day.label}
              </label>
            </div>
          ))}
          {errors.availability && (
            <p className="text-red-700">{errors.availability}</p>
          )}
        </div>

        {availability.map(availabilityDay => (
          <div key={availabilityDay.day}>
            <h4>{availabilityDay.day}</h4>
            <div className="flex space-x-4 gap-5 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor={availabilityDay.day + "StartTime"}
                  className="label"
                >
                  Hora de comienzo
                </label>
                <input
                  type="time"
                  id={availabilityDay.day + "StartTime"}
                  onChange={e => handleChangeTimeSlots(e, availabilityDay.day)}
                  className="input input-bordered"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor={availabilityDay.day + "EndTime"}
                  className="label"
                >
                  Hora de finalizacion
                </label>
                <input
                  type="time"
                  id={availabilityDay.day + "EndTime"}
                  onChange={e => handleChangeTimeSlots(e, availabilityDay.day)}
                  className="input input-bordered"
                />
              </div>
            </div>

            <button type="submit">Enviar</button>

          </div>
        ))}
      </form>
      <ModalButton
        modalId="registerServiceFeedback"
        status={modalFeedback.status}
        modalTitle={modalFeedback.title}
        modalBody={modalFeedback.body}
        labelPrimaryBtn="Volver a la dashboard"
        // onPrimaryAction={() => router.push('/dashboard')} // TODO Back to home
        labelSecondaryBtn="Registrar otro servicio"
        onSecondaryAction={() => setModalFeedback({
          status: "closed",
          title: "",
          body: "",
        })} // TODO Stay on page, close modal and reset form
      />
    </>
  );
};

export default RegisterServiceForm;
