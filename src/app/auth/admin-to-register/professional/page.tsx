"use client";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/Components/ui/checkbox";

const dayAvailability = [
  {
    id: "monday",
    label: "Lunes",
  },
  {
    id: "tuesday",
    label: "Martes",
  },
  {
    id: "wednesday",
    label: "Miércoles",
  },
  {
    id: "thursday",
    label: "Jueves",
  },
  {
    id: "friday",
    label: "Viernes",
  },
  {
    id: "saturday",
    label: "Sábado",
  },
  {
    id: "sunday",
    label: "Domingo",
  },
]

const formSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "El nombre debe contener al menos 2 caracteres.",
    }),
    last_name: z.string().min(2, {
      message: "El apellido debe contener al menos 2 caracteres.",
    }),
    email: z.string().email({ message: "Email invalido" }),
    password: z.string().min(8, {
      message: "La contraseña debe contener al menos 8 caracteres",
    }),
    confirmPassword: z.string().min(8, {
      message:
        "La confirmación de la contraseña debe tener al menos 8 caracteres",
    }),
    dayAvailability: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un dia.",
  }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });


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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      dayAvailability: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/register/professional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify('values'),
      });
      const data = await res.json();
      if (res.status !== 201 ) {
        throw new Error(`Error ${res.status}: ${data.message}`);
      } 
      toast({
        title: 'Usuario creado correctamente',
        variant: 'success',
        description: `El usuario administrador se ha creado correctamente`,
        action: <ToastAction onClick={() => router.push('/home')} altText="Volver al inicio">Volver al inicio</ToastAction>
      }) 
    } catch (error) {

    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dayAvailability"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Disponibilidad</FormLabel>
                <FormDescription>
                  Selecciona los dias de disponibilidad.
                </FormDescription>
              </div>
              {dayAvailability.map((day) => (
                <FormField
                  key={day.id}
                  control={form.control}
                  name="dayAvailability"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={day.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, day.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {day.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default page;
