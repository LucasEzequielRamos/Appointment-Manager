"use client";

import { CheckboxGroup } from "@/Components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/Components/ui/button";
// import {
//   CheckboxGroup,
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/Components/ui/form";
// import { Input } from "@/Components/ui/input";
// import { useRouter } from "next/navigation";

// const timeSlotSchema = z.object({
//   startTime: z
//     .string()
//     .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
//   endTime: z
//     .string()
//     .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
// });

// const dayAvailabilitySchema = z.object({
//   day: z.enum([
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ]),
//   timeSlots: z
//     .array(timeSlotSchema)
//     .nonempty("Debes añadir al menos una franja horaria"),
// });

// const formSchema = z
//   .object({
//     first_name: z.string().min(2, {
//       message: "El nombre debe contener al menos 2 caracteres.",
//     }),
//     last_name: z.string().min(2, {
//       message: "El apellido debe contener al menos 2 caracteres.",
//     }),
//     email: z.string().email({ message: "Email invalido" }),
//     password: z.string().min(8, {
//       message: "La contraseña debe contener al menos 8 caracteres",
//     }),
//     confirmPassword: z.string().min(8, {
//       message:
//         "La confirmación de la contraseña debe tener al menos 8 caracteres",
//     }),
//     availability: z
//       .array(dayAvailabilitySchema)
//       .nonempty("Debes seleccionar al menos un día de disponibilidad"),
//   })
//   .refine(data => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Las contraseñas no coinciden",
//   });

// export function page() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       availability: [],
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       // const res = await fetch("/api/register/admin", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   body: JSON.stringify(values),
//       // });
//       // const data = await res.json();
//       // TODO: Toast with created successfully and back to home or register another admin
//       console.log(values);
//       // if (data.status === 201) router.push("/auth/login");
//     } catch (error) {
//       console.log(error); // TODO: Toast with error
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col w-fit mx-auto items-center justify-center"
//       >
//         <FormField
//           control={form.control}
//           name="first_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nombre</FormLabel>
//               <FormControl>
//                 <Input {...field} value={field.value || ""} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="last_name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Apellido</FormLabel>
//               <FormControl>
//                 <Input {...field} value={field.value || ""} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} value={field.value || ""} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Contraseña</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} value={field.value || ""} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="confirmPassword"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Confirmar contraseña</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} value={field.value || ""} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="availability"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel>Días de Disponibilidad</FormLabel>
//               <FormControl>
//                 <div className="flex flex-col space-y-2">
//                   <CheckboxGroup
//                     options={[
//                       { label: "Lunes", value: "Monday" },
//                       { label: "Martes", value: "Tuesday" },
//                       { label: "Miércoles", value: "Wednesday" },
//                       { label: "Jueves", value: "Thursday" },
//                       { label: "Viernes", value: "Friday" },
//                       { label: "Sabado", value: "Saturday" },
//                       { label: "Domingo", value: "Sunday" },
//                     ]}
//                     name={field.name} // Usa el nombre del campo
//                   />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Registrarse</Button>
//         {/*  */}
//       </form>
//     </Form>
//   );
// }

// export default page;

// pages/register.tsx
import { useState } from "react";

interface TimeSlot {
  start_time: string;
  end_time: string;
}

interface Availability {
  day: string;
  time_slots: TimeSlot[];
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  availability: Availability[];
}

const page = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    availability: [
      {
        day: "",
        time_slots: [],
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, dataset } = e.target;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("first_name", formData.first_name);
    dataToSend.append("last_name", formData.last_name);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    dataToSend.append("availability", JSON.stringify(formData.availability));

    const response = await fetch("/api/register", {
      method: "POST",
      body: dataToSend,
    });

    if (response.ok) {
      console.log("Registro exitoso");
    } else {
      console.error("Error en el registro");
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">Nombre:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <h2>Disponibilidad</h2>
        <CheckboxGroup
          options={[{ label: "lunes", value: "monday" }]}
          name="day_availability"
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default page;
