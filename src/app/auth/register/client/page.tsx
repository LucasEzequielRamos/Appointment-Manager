"use client";

import SignInGoogleButton from "@/Components/SigninGoogleButton";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface User {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
  coverage?: string;
  other_coverage?: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Para obtener los parámetros de la URL

  const [user, setUser] = useState<User>({
    email: searchParams?.get("email") || "",
    password: "",
    first_name: searchParams?.get("first_name") || "",
    last_name: searchParams?.get("last_name") || "",
    address: "",
    phone: "",
    coverage: "",
    other_coverage: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user != null) {
      const { email, password } = user;
      if (!email || !password) {
        setError("El correo y la contraseña son obligatorios.");
        return;
      }
    }

    console.log(user);

    const res = await fetch("/api/register/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === 201) router.push("/auth/login");

    setError(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Correo Electrónico*
            </label>
            <input
              type="email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña*</label>
            <input
              type="password"
              name="password"
              value={user?.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="first_name"
              value={user?.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Apellido</label>
            <input
              type="text"
              name="last_name"
              value={user?.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="address"
              value={user?.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={user?.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cobertura</label>
            {user.coverage !== "" ? (
              <input
                type="text"
                name="other_coverage"
                value={user.other_coverage || ""}
                onChange={handleChange}
                placeholder="Especifique otra cobertura"
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <select
                name="coverage"
                value={user.coverage}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Seleccione una opción</option>
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
          <SignInGoogleButton />
        </form>
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

export default RegisterForm;
