import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import React from 'react'
function hoursToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  return  hours * 60 + minutes;
}


const useRegister = ({apiUrl, userType}:{apiUrl?:string, userType?:string},) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [formData, setFormData ] = useState<FormDataToRegister >(
      userType === 'service' 
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
    });
    
    const [errors, setErrors] = useState<ErrorsFormData >({
      
    });

  const [availability, setAvailability] = useState<Availability[]>([]);


  const validateForm = () => {
        const newErrors: typeof errors = {};

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
          newErrors.email = "Email inválido";
        }
        

        if(userType !== 'service'){
          if (!formData.first_name || formData.first_name.length < 2) {
            newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
          }
      
          if (!formData.last_name || formData.last_name.length < 2) {
            newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
          }
          
          
          if (!formData.password || formData.password.length < 8) {
            newErrors.password = "La contraseña debe contener al menos 8 caracteres";
          }
          
          if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = "Las contraseñas no coinciden";
          }
          
          if(userType === 'client'){
            if (!formData.address || formData.address.length < 2) {
              newErrors.address = "Debe escribir su direccion";
            }
            if (!formData.phone || formData.phone.length < 2) {
              newErrors.phone = "Debe escribir su numero de contacto";
            }
            if (!formData.coverage  && !formData.other_coverage ) {
              newErrors.coverage = "Debe seleccionar una cobertura";
            }
          }
        }else{
          
    if (!formData.name) {
      newErrors.name = "Debe seleccionar un servicio";
    }

    if (!formData.coverage) {
      newErrors.coverage = "Debe seleccionar una cobertura";
    }

    if (!formData.duration) {
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
        if (Number(formData.duration) > totalTime) {
          console.log(totalTime, Number(formData.duration));
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
      console.log(name, value)
      if (name === "phone" && value.length > 15) return;
    
      if (name === "phone") {
        setFormData({
          ...formData,
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

      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    console.log(formData)
    console.log({availability})

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
      setFormData((prevData) => ({
        ...prevData,
        coverage: newCoverage,
      }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      const values = userType === 'service' ?{
        ...formData,
        availability
      }:
      {
      ...formData
      }

    
      const res = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log(data, 'LOG EN HOOK')
    
      if (data.status !== 200){
        setErrors({api: data.message});
      } 
      if(data.message === 'Client user created successfully' && userType === 'client'){
        router.push('/auth/login')
      }
    
      setFormData(userType === 'service' 
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
      setAvailability([])
    };
    
  return {
    handleChange,
    handleSubmit,
    errors,
    formData,
    handleCoverageChange,
    availability,
    handleChangeTimeSlots
  }
}

export default useRegister



