"use client";

import { useState } from "react";
interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slot: TimeSlot;
}

const arrDays = [
  { id: "Monday", label: "Lunes" },
  { id: "Tuesday", label: "Martes" },
  { id: "Wednesday", label: "Miércoles" },
  { id: "Thursday", label: "Jueves" },
  { id: "Friday", label: "Viernes" },
  { id: "Saturday", label: "Sábado" },
  { id: "Sunday", label: "Domingo" },
];

const hoursToMinutes = (hourString: string) => {
  const [hours, minutes] = hourString.split(":").map(Number); // Convierte ambas partes en números

  // Convertir las horas a minutos y sumar los minutos
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
};
const page = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [formData, setFormData] = useState<{
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
  }>({
    email: "",
    name: "",
    availability: [
      {
        day: "",
        time_slot: { start_time: "", end_time: "" },
      },
    ],
    duration: "",
    coverage: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    availability?: string;
    duration?: string;
    coverage?: string;
    email?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.name) {
      newErrors.name = "Debe seleccionar un servicio";
    }

    if (!formData.coverage) {
      newErrors.coverage = "Debe seleccionar una cobertura";
    }

    if (!formData.duration) {
      newErrors.duration = "Debe marcar una duracion del servicio";
    }

    if (availability.length === 0) {
      newErrors.availability = "Debes seleccionar al menos un día.";
    } else if (availability.length >= 1) {
      let tsFull = true; // Time Slot Full
      let totalTime = 0;
      availability.forEach(ts => {
        if (ts.time_slot.start_time === "") {
          tsFull = false;
          return;
        }
        if (ts.time_slot.end_time === "") {
          tsFull = false;
          console.log("hola");
          return;
        }

        totalTime =
          hoursToMinutes(ts.time_slot.end_time) -
          hoursToMinutes(ts.time_slot.start_time);
        if (Number(formData.duration) > totalTime) {
          console.log(totalTime, Number(formData.duration));
          newErrors.availability =
            "El horario es mas corto que la duracion del servicio";
        }
      });
      if (!tsFull) {
        newErrors.availability = "Horarios mal seleccionados";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      setAvailability(prev => [
        ...prev,
        { day: name, time_slot: { start_time: "", end_time: "" } },
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const values = {
        ...formData,
        availability,
      };
      console.log("Valores enviados:", values);

      const res = await fetch("/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status !== 201) {
        throw new Error(`Error ${res.status}: ${data.message}`);
      }

      setFormData({
        email: "",
        name: "",
        availability: [
          {
            day: "",
            time_slot: { start_time: "", end_time: "" },
          },
        ],
        duration: "",
        coverage: "",
      });
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
    }
  };

  // console.log(formData)

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control my-10 mx-auto p-10 border border-accent-200 rounded md:w-1/3"
    >
      <div>
        <label className="block text-sm font-medium">
          Email del profesional
        </label>
        <input
          value={formData.email}
          type="email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-700">{errors.email}</p>}
      </div>
      <div className="flex flex-col">
        <label className="label">Seleccione un servicio</label>
        <select
          onChange={e => {
            setFormData({ ...formData, name: e.target.value });
          }}
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
          onChange={e => {
            setFormData({ ...formData, coverage: e.target.value });
          }}
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
          id="timeFragmentSelect"
          className="select select-bordered w-full max-w-xs"
          onChange={e => {
            setFormData({
              ...formData,
              duration: e.target.value.toString(),
            });
          }}
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
              onChange={changeHandler}
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
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default page;
