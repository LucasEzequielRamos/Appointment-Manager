import { validateFormPostService, validateFormPutService } from "@/utils/validations";
import { useRouter } from "next/router";
import { useState } from "react";

const useService = ({
  apiUrl,
  method,
  data,
  registratorRole,
}: {
  apiUrl?: string;
  userType: string;
  method: string;
  data?: any;
  registratorRole?: string;
}) => {
  function getInitialFormPutData(data: any) {
    return {
      email: data.email,
      name: data.name,
      duration: data.duration,
      coverage: data.coverage,
    };
  }
  const router = useRouter();

  const [formPostData, setFormPostData] = useState<
    formPostDataToRegister | any
  >({
    email: "",
    name: "",
    duration: "",
    coverage: "",
  });

  const [formPutData, setFormPutData] = useState<formPostDataToRegister | any>(
    getInitialFormPutData(data)
  );

  const [errors, setErrors] = useState<ErrorsFormPostData>({});

  const [availability, setAvailability] = useState<Availability[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setAvailability((prev) => [
          ...prev,
          { day: name, time_slot: { start_time: "", end_time: "" } },
        ]);
      } else {
        setAvailability((prev) => prev.filter((item) => item.day !== name));
      }
    }

    setFormPostData({
      ...formPostData,
      [name]: value,
    });
    setFormPutData({
      ...formPutData,
      [name]: value,
    });
    
    }

    const handleChangeTimeSlots = (
      e: React.ChangeEvent<HTMLInputElement>,
      day: string
    ) => {
      const { id, value } = e.target;
      const isStart = id.includes("StartTime");
  
      setAvailability((prevAvailability) =>
        prevAvailability.map((availabilityDay) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (method === "POST") {
        if (!validateFormPostService(formPostData, availability, errors, setErrors)) return false; 
      } else {
        if (!validateFormPutService(formPutData, availability, errors, setErrors)) return false;
      }
  
      let valuesToPost;
  
      if (method === "POST") {
        valuesToPost = { ...formPostData, };
      }
      
      let valuesToPut;
  
      if (method === "PUT") {
        valuesToPut = {  ...formPutData,
                availability,
                role: data.role,
                user_id: data.user_id,
              }
           
      }
  
      const res = await fetch(`${apiUrl}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(method === "POST" ? valuesToPost : valuesToPut),
      });
      const dataFetch = await res.json();
  
      if (dataFetch.status !== 201) {
        setErrors({ api: dataFetch.message });
      }
      if (
        dataFetch.message === "Client user created successfully" &&
        registratorRole === "CLIENT"
      ) {
        router.push("/auth/login");
      }
  
      setFormPostData(
       {
              email: "",
              name: "",
              duration: "",
              coverage: "",
            }
          
      );
      setAvailability([]);
      // (e.target as HTMLFormElement).reset();
      return true; //!
    };

    return {
      handleChange,
      handleSubmit,
      errors,
      formPostData,
      handleChangeTimeSlots,
      formPutData,
      availability
    }
};

export default useService;