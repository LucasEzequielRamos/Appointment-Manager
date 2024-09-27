"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
  coverage?: string;
}

const RegisterForm = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    coverage: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (data.status === 200) router.push("/auth/login");

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
            <input
              type="text"
              name="coverage"
              value={user?.coverage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
