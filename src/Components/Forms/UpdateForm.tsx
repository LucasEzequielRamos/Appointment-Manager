"use client";

import useRegister from "@/hooks/useRegister";
("@/hooks/useRegister");

const UpdateForm = ({ data }: any) => {
  const {
    errors,
    handleChange,
    handleSubmit,
    formPutData,
    handleCoverageChange,
  } = useRegister({
    apiUrl: `/api/user/${data.user_id}`,
    userType: data.role,
    method: "PUT",
    data: data,
  });

  return (
    <div className="flex items-center justify-center text-black bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cambio de datos</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            {errors.first_name && (
              <p className="text-red-700">{errors.first_name}</p>
            )}
            <input
              type="text"
              name="first_name"
              value={formPutData?.first_name}
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
              value={formPutData?.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {data.role === "CLIENT" && (
            <>
              <div>
                <label className="block text-sm font-medium">Dirección</label>
                {errors.address && (
                  <p className="text-red-700">{errors.address}</p>
                )}
                <input
                  type="text"
                  name="address"
                  value={formPutData?.address}
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
                  value={formPutData?.phone}
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
                {formPutData.coverage === "other" ? (
                  <div className="relative  ">
                    <input
                      type="text"
                      name="other_coverage"
                      value={formPutData.other_coverage || ""}
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
                    value={formPutData.coverage}
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
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Cambiar Datos
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
