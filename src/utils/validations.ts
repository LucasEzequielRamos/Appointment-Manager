import { hoursToMinutes } from "./helpers";

export const validateFormPutUsers = (
  data: any,
  userType: string,
  errors: ErrorsFormPostData,
  setErrors: (errors: ErrorsFormPostData) => void
) => {
  const newErrors: typeof errors = {};

  if (!data.first_name || data.first_name.length < 2) {
    newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
  }
  if (!data.last_name || data.last_name.length < 2) {
    newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
  }

  // if (data.password && data.password.length < 8) {
  //   newErrors.password = "La contraseña debe contener al menos 8 caracteres";
  // }

  // if (formPostData.password !== formPostData.confirm_password) {
  //   newErrors.confirm_password = "Las contraseñas no coinciden";
  // }

  if (userType === "client") {
    if (!data.address || data.address.length < 2) {
      newErrors.address = "Debe escribir su direccion";
    }
    if (!data.phone || data.phone.length < 2) {
      newErrors.phone = "Debe escribir su numero de contacto";
    }
    if (!data.coverage && !data.other_coverage) {
      newErrors.coverage = "Debe seleccionar una cobertura";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateFormPostUsers = (
  data: any,
  userType: string,
  errors: any,
  setErrors: (errors: any) => void
) => {
  const newErrors: typeof errors = {};

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email)) {
    newErrors.email = "Email inválido";
  }
  if (!data.first_name || data.first_name.length < 2) {
    newErrors.first_name = "El nombre debe contener al menos 2 caracteres.";
  }

  if (!data.last_name || data.last_name.length < 2) {
    newErrors.last_name = "El apellido debe contener al menos 2 caracteres.";
  }

  if (!data.password || data.password.length < 8) {
    newErrors.password = "La contraseña debe contener al menos 8 caracteres";
  }

  if (data.password !== data.confirm_password) {
    newErrors.confirm_password = "Las contraseñas no coinciden";
  }

  if (userType === "client") {
    if (!data.address || data.address.length < 2) {
      newErrors.address = "Debe escribir su direccion";
    }
    if (!data.phone || data.phone.length < 2) {
      newErrors.phone = "Debe escribir su numero de contacto";
    }
    if (!data.coverage && !data.other_coverage) {
      newErrors.coverage = "Debe seleccionar una cobertura";
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateFormPostService = (
  data: any,
  availability: any,
  errors: any,
  setErrors: (errors: any) => void
) => {
  const newErrors: typeof errors = {};

  if (!data.name) {
    newErrors.name = "Debe seleccionar un servicio";
  }

  if (!data.coverage) {
    newErrors.coverage = "Debe seleccionar una cobertura";
  }

  if (!data.duration) {
    newErrors.duration = "Debe marcar una duracion del servicio";
  }

  if (availability.length === 0) {
    newErrors.availability = "Debes seleccionar al menos un día.";
  } else if (availability.length >= 1) {
    let tsFull = true; // Time Slot Full
    let totalTime = 0;
    availability.forEach(
      (ts: { time_slot: { start_time: string; end_time: string } }) => {
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

        let duration =
          endMinutes >= startMinutes
            ? endMinutes - startMinutes
            : 24 * 60 - startMinutes + endMinutes;

        totalTime += duration;
        if (Number(data.duration) > totalTime) {
          console.log(totalTime, Number(data.duration));
          newErrors.availability =
            "El horario es mas corto que la duracion del servicio";
        }
      }
    );
    if (!tsFull) {
      newErrors.availability = "Horarios mal seleccionados";
    }
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateFormPutService = (
  data: any,
  availability: any,
  errors: any,
  setErrors: (errors: any) => void
) => {
  const newErrors: typeof errors = {};

  {
    if (!data.name) {
      newErrors.name = "Debe seleccionar un servicio";
    }

    if (!data.coverage) {
      newErrors.coverage = "Debe seleccionar una cobertura";
    }

    if (!data.duration) {
      newErrors.duration = "Debe marcar una duracion del servicio";
    }

    if (availability.length === 0) {
      newErrors.availability = "Debes seleccionar al menos un día.";
    } else if (availability.length >= 1) {
      let tsFull = true; // Time Slot Full
      let totalTime = 0;
      availability.forEach(
        (ts: { time_slot: { start_time: string; end_time: string } }) => {
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

          let duration =
            endMinutes >= startMinutes
              ? endMinutes - startMinutes
              : 24 * 60 - startMinutes + endMinutes;

          totalTime += duration;
          if (Number(data.duration) > totalTime) {
            console.log(totalTime, Number(data.duration));
            newErrors.availability =
              "El horario es mas corto que la duracion del servicio";
          }
        }
      );
      if (!tsFull) {
        newErrors.availability = "Horarios mal seleccionados";
      }
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
