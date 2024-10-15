"use client";

import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slot: TimeSlot;
}

const dayAvailability = [
  { id: "monday", label: "Lunes" },
  { id: "tuesday", label: "Martes" },
  { id: "wednesday", label: "Miércoles" },
  { id: "thursday", label: "Jueves" },
  { id: "friday", label: "Viernes" },
  { id: "saturday", label: "Sábado" },
  { id: "sunday", label: "Domingo" },
];

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [availability, setAvailability] = useState<Availability[]>([]);
  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    availability?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.first_name || formData.first_name.length < 2) {
      newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
    }

    if (!formData.last_name || formData.last_name.length < 2) {
      newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "La contraseña debe contener al menos 8 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (availability.length === 0) {
      newErrors.availability = "Debes seleccionar al menos un día.";
    } else if (availability) {
      let tsFull = true;
      availability.forEach(ts => {
        if (ts.time_slot.start_time === "") tsFull = false;
        if (ts.time_slot.end_time === "") tsFull = false;
      });
      console.log(tsFull);
      if (!tsFull) {
        newErrors.availability = "Horarios mal seleccionados";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const updatedValues = {
        ...formData,
        availability,
      };
      console.log("Valores enviados:", updatedValues);

      const res = await fetch("/api/register/professional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      toast({
        title: "Usuario creado correctamente",
        variant: "success",
        description: `El usuario administrador se ha creado correctamente`,
        action: (
          <ToastAction
            onClick={() => router.push("/home")}
            altText="Volver al inicio"
          >
            Volver al inicio
          </ToastAction>
        ),
      });
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const nameToSend = name.charAt(0).toUpperCase() + name.slice(1);
    console.log(name.charAt(0).toUpperCase() + name.slice(1));

    if (checked) {
      setAvailability(prev => [
        ...prev,
        { day: nameToSend, time_slot: { start_time: "", end_time: "" } },
      ]);
    } else {
      setAvailability(prev => prev.filter(item => item.day !== name));
    }
  };

  const handleChangeTimeSlots = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    const { id, value } = e.target;
    const isStart = id.includes("StartTime");

    setAvailability(prevAvailability =>
      prevAvailability.map(availabilityDay => {
        if (availabilityDay.day === day) {
          return {
            ...availabilityDay,
            time_slot: {
              ...availabilityDay.time_slot,
              start_time: isStart
                ? value
                : availabilityDay.time_slot.start_time,
              end_time: !isStart ? value : availabilityDay.time_slot.end_time,
            },
          };
        }
        return availabilityDay;
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registro de profesional
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              value={formData.first_name}
              onChange={e =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.first_name && (
              <p className="text-red-700">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input
              value={formData.last_name}
              onChange={e =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.last_name && (
              <p className="text-red-700">{errors.last_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={formData.email}
              type="email"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-700">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-700">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={e =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword && (
              <p className="text-red-700">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold">Disponibilidad</h3>
            {dayAvailability.map(day => (
              <div key={day.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={day.id + "Availability"}
                  name={day.id}
                  onChange={changeHandler}
                  className="mr-2"
                />
                <label htmlFor={day.id}>{day.label}</label>
              </div>
            ))}
            {errors.availability && (
              <p className="text-red-700">{errors.availability}</p>
            )}
          </div>

          {availability.map(availabilityDay => (
            <div
              key={availabilityDay.day}
              className="flex items-center space-x-4 mb-4"
            >
              <input
                type="time"
                id={availabilityDay.day + "StartTime"}
                onChange={e => handleChangeTimeSlots(e, availabilityDay.day)}
                className="border border-gray-300 rounded"
              />
              <label
                htmlFor={availabilityDay.day + "StartTime"}
                className="block text-sm font-medium"
              >
                {availabilityDay.day} Start Time
              </label>
              <input
                type="time"
                id={availabilityDay.day + "EndTime"}
                onChange={e => handleChangeTimeSlots(e, availabilityDay.day)}
                className="border border-gray-300 rounded"
              />
              <label
                htmlFor={availabilityDay.day + "EndTime"}
                className="block text-sm font-medium"
              >
                {availabilityDay.day} End Time
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Registrar profesional
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
