"use client";

import { useState } from "react";

const Page = () => {
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

  const [errors, setErrors] = useState<{
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const values = {
        ...formData,
      };
      console.log("Valores enviados:", values);

      const res = await fetch("/api/register/admin", {
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
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      console.log(data);
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registro de administrador
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
