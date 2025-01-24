import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  validateFormPostUsers,
  validateFormPutUsers,
} from "@/utils/validations";

const useRegister = ({
  apiUrl,
  userType,
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
  const router = useRouter();

  const searchParams = useSearchParams();

  function getInitialFormPostData(searchParams: URLSearchParams) {
    return {
      email: searchParams?.get("email") || "",
      password: "",
      confirm_password: "",
      first_name: searchParams?.get("first_name") || "",
      last_name: searchParams?.get("last_name") || "",
      address: "",
      phone: "",
      coverage: "",
      other_coverage: "",
    };
  }

  function getInitialFormPutData(userType: string, method: string, data: any) {
    if (method === "PUT") {
      if (userType === "CLIENT") {
        return {
          email: data.email,
          // password: data.password,
          // confirm_password: data.confirm_password,
          first_name: data.first_name,
          last_name: data.last_name,
          address: data.client.address,
          phone: data.client.phone,
          coverage: data.client.coverage,
          other_coverage: data.client.other_coverage,
        };
      } else {
        return {
          first_name: data.first_name,
          last_name: data.last_name,
        };
      }
    }
  }

  const [formPostData, setFormPostData] = useState<FormPostDataToRegister | any>(
    getInitialFormPostData(searchParams)
  );

  const [formPutData, setFormPutData] = useState<FormPostDataToRegister | any>(
    getInitialFormPutData(userType, method, data)
  );

  const [errors, setErrors] = useState<ErrorsFormPostData>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
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

    setFormPostData({
      ...formPostData,
      [name]: value,
    });
    setFormPutData({
      ...formPutData,
      [name]: value,
    });
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

    if (method === "POST") {
      if (!validateFormPostUsers(formPostData, userType, errors, setErrors))
        return false; //!
    } else {
      let role = data.role;
      if (!validateFormPutUsers(formPutData, role, errors, setErrors)) return false;
    }

    let valuesToPost;

    if (method === "POST") {
      valuesToPost = { ...formPostData };
    }

    let valuesToPut;

    if (method === "PUT") {
      valuesToPut = {
        ...formPutData,
        role: data.role,
        user_id: data.user_id,
      };
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
    } else if (  
      registratorRole !== "ADMIN"
    ) {
      router.push("/auth/login");
    }

    setFormPostData(
       {
            email: searchParams?.get("email") || "",
            password: "",
            confirm_password: "",
            first_name: searchParams?.get("first_name") || "",
            last_name: searchParams?.get("last_name") || "",
            address: "",
            phone: "",
            coverage: "",
            other_coverage: "",
          }
    );
    // (e.target as HTMLFormElement).reset();
    return true; //!
  };

  return {
    handleChange,
    handleSubmit,
    errors,
    formPostData,
    handleCoverageChange,
    formPutData,
  };
};

export default useRegister;
