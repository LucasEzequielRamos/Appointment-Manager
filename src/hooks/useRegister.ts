import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function hoursToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  return  hours * 60 + minutes;
}

const useRegister = ({apiUrl, userType, method, data}:{apiUrl?:string, userType?:string,  method:string, data?: any},) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    

    const [formPostData, setFormPostData ] = useState<formPostDataToRegister | any >(
      userType === 'SERVICE'
      ?
      {
        email: "",
        name: "",
        duration: "",
        coverage: "",
      }
      :
      {
        email: searchParams?.get("email") || "",
        password: "",
        confirm_password:"",
        first_name: searchParams?.get("first_name") || "",
        last_name: searchParams?.get("last_name") || "",
        address: "",
        phone: "",
        coverage: "",
        other_coverage: "",
      }
      
    );
    
    const [formPutData, setFormPutData] = useState<formPostDataToRegister | any >(
      userType === 'SERVICE'
      ?
      {
        email: data.email,
        name: data.name,
        duration: data.duration,
        coverage: data.coverage,
      }
      :
      userType === 'CLIENT'
      ?
      {
        email:data.email  ,
        // password:data.password ,
        // confirm_password:data.confirm_password,
        first_name:data.first_name  ,
        last_name:data.last_name  ,
        address:data.client.address ,
        phone:data.client.phone ,
        coverage:data.client.coverage ,
        other_coverage:data.client.other_coverage ,
      }
      :
      {
        first_name:data.first_name,
        last_name:data.last_name,
        
      }
    )


    const [errors, setErrors] = useState<ErrorsformPostData >({
      
    });

  const [availability, setAvailability] = useState<Availability[]>([]);

  const validateFormPut = () => {
    const newErrors: typeof errors = {};

    if(userType !== 'SERVICE'){
      if (!formPutData.first_name || formPutData.first_name.length < 2) {
        newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
      }
  
      if (!formPutData.last_name || formPutData.last_name.length < 2) {
        newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
      }     
      
      // if (formPutData.password && formPutData.password.length < 8) {
      //   newErrors.password = "La contraseña debe contener al menos 8 caracteres";
      // }
      
      // if (formPostData.password !== formPostData.confirm_password) {
      //   newErrors.confirm_password = "Las contraseñas no coinciden";
      // }
      
      if(userType === 'client'){
        if (!formPutData.address || formPutData.address.length < 2) {
          newErrors.address = "Debe escribir su direccion";
        }
        if (!formPutData.phone || formPutData.phone.length < 2) {
          newErrors.phone = "Debe escribir su numero de contacto";
        }
        if (!formPutData.coverage  && !formPutData.other_coverage ) {
          newErrors.coverage = "Debe seleccionar una cobertura";
        }
      }
    }else{          
      if (!formPutData.name) {
        newErrors.name = "Debe seleccionar un servicio";
      }

      if (!formPutData.coverage) {
        newErrors.coverage = "Debe seleccionar una cobertura";
      }

      if (!formPutData.duration) {
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
          const startMinutes = hoursToMinutes(ts.time_slot.start_time);
          const endMinutes = hoursToMinutes(ts.time_slot.end_time);
      
          let duration = endMinutes >= startMinutes 
            ? endMinutes - startMinutes 
            : (24 * 60) - startMinutes + endMinutes; 
      
          totalTime += duration;
          if (Number(formPutData.duration) > totalTime) {
            console.log(totalTime, Number(formPutData.duration));
            newErrors.availability =
              "El horario es mas corto que la duracion del servicio";
          }
        });
        if (!tsFull) {
          newErrors.availability = "Horarios mal seleccionados";
        }
      }
    }
   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFormPost = () => {
        const newErrors: typeof errors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formPutData.email || !emailPattern.test(formPostData.email)) {
          newErrors.email = "Email inválido";
        }
        if(userType !== 'SERVICE'){
          if (!formPostData.first_name || formPostData.first_name.length < 2 && !formPutData.first_name || formPutData.first_name.length < 2) {
            console.log(formPutData.first_name.length)
            newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
          }
      
          if (!formPostData.last_name || formPostData.last_name.length < 2 && !formPutData.last_name || formPutData.last_name.length < 2) {
            newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
          }
          
          
          if (!formPostData.password || formPostData.password.length < 8 && !formPutData.password || formPutData.password.length < 8) {
            newErrors.password = "La contraseña debe contener al menos 8 caracteres";
          }
          
          if (formPostData.password !== formPostData.confirm_password) {
            newErrors.confirm_password = "Las contraseñas no coinciden";
          }
          
          if(userType === 'client'){
            if (!formPostData.address || formPostData.address.length < 2) {
              newErrors.address = "Debe escribir su direccion";
            }
            if (!formPostData.phone || formPostData.phone.length < 2) {
              newErrors.phone = "Debe escribir su numero de contacto";
            }
            if (!formPostData.coverage  && !formPostData.other_coverage ) {
              newErrors.coverage = "Debe seleccionar una cobertura";
            }
          }
        }else{          
          if (!formPostData.name) {
            newErrors.name = "Debe seleccionar un servicio";
          }

          if (!formPostData.coverage) {
            newErrors.coverage = "Debe seleccionar una cobertura";
          }

          if (!formPostData.duration) {
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
              const startMinutes = hoursToMinutes(ts.time_slot.start_time);
              const endMinutes = hoursToMinutes(ts.time_slot.end_time);
          
              let duration = endMinutes >= startMinutes 
                ? endMinutes - startMinutes 
                : (24 * 60) - startMinutes + endMinutes; 
          
              totalTime += duration;
              if (Number(formPostData.duration) > totalTime) {
                console.log(totalTime, Number(formPostData.duration));
                newErrors.availability =
                  "El horario es mas corto que la duracion del servicio";
              }
            });
            if (!tsFull) {
              newErrors.availability = "Horarios mal seleccionados";
            }
          }
        }
       
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,      
    ) => {
      const { name, value } = e.target;
      if (name === "phone" && value.length > 15) return;
    
      if (name === "phone") {
        setFormPostData({
          ...formPostData,
          [name]: value.toString(),
        });
        setFormPutData({
          ...formPutData,
          [name]: value.toString(),
        });
      }

      if(e.target.type === "checkbox"){
        if (e.target.checked) {
          setAvailability(prev => [
            ...prev,
            { day: name, time_slot: { start_time: "", end_time: "" } },
          ]);
        } else {
          setAvailability(prev => prev.filter(item => item.day !== name));
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

    const handleCoverageChange = (newCoverage: string) => {
      setFormPostData((prevData: any) => ({
        ...prevData,
        coverage: newCoverage,
      }));
      setFormPutData((prevData: any) => ({
        ...prevData,
        coverage: newCoverage,
      }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if(method === 'POST'){
        if(!validateFormPost()) return
      }else{
        if(!validateFormPut()) return
      }
    

      const valuesToPost = userType === 'SERVICE'  ?{
        ...formPostData,
        availability
      }:
      {
      ...formPostData
      }

      const valuesToPut = userType === 'SERVICE'  ?{
        ...formPutData,
        availability,
        role: data.role,
        user_id: data.user_id
      }
      :
      {
      ...formPutData,
      role: data.role,
      user_id: data.user_id
      
      }


    
      const res = await fetch(`${apiUrl}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(method ===' POST' ? valuesToPost : valuesToPut),
      });
      const dataFetch = await res.json();
      // console.log(dataFetch, 'LOG EN HOOK AAAAAAAA')
    
      if (dataFetch.status !== 201){
        setErrors({api: data.message});
      } 
      // if(dataFetch.message === 'Client user created successfully' && userType === 'client'){
      //   router.push('/auth/login')
      // }
    
      setFormPostData(userType === 'SERVICE' 
        ?
          {
            email: "",
            name: "",
            duration: "",
            coverage: "",
          }
        :
        {
        email: searchParams?.get("email") || "",
        password: "",
        confirm_password:"",
        first_name: searchParams?.get("first_name") || "",
        last_name: searchParams?.get("last_name") || "",
        address: "",
        phone: "",
        coverage: "",
        other_coverage: "",
      })
      setAvailability([]),
      (e.target as HTMLFormElement).reset();
    };
    
  return {
    handleChange,
    handleSubmit,
    errors,
    formPostData,
    handleCoverageChange,
    availability,
    handleChangeTimeSlots,
    formPutData
  }
}

export default useRegister



