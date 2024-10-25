"use client";

import SignInGoogleButton from "@/Components/Buttons/SigninGoogleButton";
import Link from "next/link";
import useRegister from "@/hooks/useRegister";
("@/hooks/useRegister");

const RegisterClientForm = () => {
  const { errors, handleChange, handleSubmit, formData, handleCoverageChange } =
    useRegister({ apiUrl: "/api/register/client", userType: "client" });

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            {errors.first_name && (
              <p className="text-red-700">{errors.first_name}</p>
            )}
            <input
              type="text"
              name="first_name"
              value={formData?.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Apellido</label>
            {errors.last_name && (
              <p className="text-red-700">{errors.last_name}</p>
            )}
            <input
              type="text"
              name="last_name"
              value={formData?.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Correo Electrónico*
            </label>
            {errors.email && <p className="text-red-700">{errors.email}</p>}
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña*</label>
            {errors.password && (
              <p className="text-red-700">{errors.password}</p>
            )}
            <input
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirmar Contraseña*
            </label>
            {errors.confirm_password && (
              <p className="text-red-700">{errors.confirm_password}</p>
            )}
            <input
              type="password"
              name="confirm_password"
              value={formData?.confirm_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            {errors.address && <p className="text-red-700">{errors.address}</p>}
            <input
              type="text"
              name="address"
              value={formData?.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            {errors.phone && <p className="text-red-700">{errors.phone}</p>}
            <input
              type="number"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded appearance-none"
              maxLength={15}
              inputMode="numeric"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cobertura</label>
            {errors.coverage && (
              <p className="text-red-700">{errors.coverage}</p>
            )}
            {formData.coverage === "other" ? (
              <div className="relative  ">
                <input
                  type="text"
                  name="other_coverage"
                  value={formData.other_coverage || ""}
                  onChange={handleChange}
                  placeholder="Especifique otra cobertura"
                  className="w-full p-2 max-h-[40px] border border-gray-300 rounded "
                />

                <button
                  className="absolute 
                  right-2 top-2 "
                  onClick={() => handleCoverageChange("")}
                >
                  x
                </button>
              </div>
            ) : (
              <select
                name="coverage"
                value={formData.coverage}
                onChange={handleChange}
                className="w-full p-2 border min-h-[40px] border-gray-300 rounded"
              >
                <option disabled value="">
                  Seleccione una opción
                </option>
                <option value="ninguna">Ninguna</option>
                <option value="bronce">Bronce</option>
                <option value="plata">Plata</option>
                <option value="oro">Oro</option>
                <option value="other">Otra (especificar)</option>
              </select>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Registrarse
          </button>
        </form>
        <SignInGoogleButton />
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Inicia Sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterClientForm;
