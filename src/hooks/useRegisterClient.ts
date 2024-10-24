import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import React from 'react'



const useRegisterClient = ({apiUrl, userType}:{apiUrl?:string, userType?:string},) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [formData, setFormData ] = useState<UserToRegister>({
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
    
    const [errors, setErrors] = useState<UserToRegister>({});


      const validateForm = () => {
        const newErrors: typeof errors = {};
    
        if (!formData.first_name || formData.first_name.length < 2) {
          newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
        }
    
        if (!formData.last_name || formData.last_name.length < 2) {
          newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
          newErrors.email = "Email inválido";
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
          if (!formData.coverage  && !formData.other_coverage || formData.other_coverage && formData.other_coverage.length >  2) {
            newErrors.coverage = "Debe seleccionar una cobertura";
          }
        }

        setErrors(newErrors);
        console.log(errors)
        return Object.keys(newErrors).length === 0;
      };
    
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      if (name === "phone" && value.length > 15) return;
    
      if (name === "phone") {
        setFormData({
          ...formData,
          [name]: value.toString(),
        });
      }
      setFormData({
        ...formData,
        [name]: value,
      });
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
    
      const res = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    
      if (data.status === 201) router.push("/auth/login");
    
      setFormData({
        email: searchParams?.get("email") || "",
        password: "",
        confirm_password:"",
        first_name: searchParams?.get("first_name") || "",
        last_name: searchParams?.get("last_name") || "",
        address: "",
        phone: "",
        coverage: "",
        other_coverage: ""
      })
      setErrors(data.message);
    };
    
  return {
    handleChange,
    handleSubmit,
    errors,
    formData,
    handleCoverageChange
  }
}

export default useRegisterClient


