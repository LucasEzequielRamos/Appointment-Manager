"use client";

import useRegisterClient from "@/hooks/useRegisterClient";

const AdminRegisterForm = ({ role }: { role: string }) => {
  const { errors, handleChange, handleSubmit, formData } = useRegisterClient({
    apiUrl: `/api/register/${role}`,
    userType: role,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registro de administrador
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.first_name && (
              <p className="text-red-700">{errors.first_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.last_name && (
              <p className="text-red-700">{errors.last_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-700">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.confirm_password && (
              <p className="text-red-700">{errors.confirm_password}</p>
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

export default AdminRegisterForm;
