import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { FormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const InscripcionAcuafitForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      requiere_acudiente: false,
      acuerdo_reglamento: false,
    },
  });

  const [successMessage, setSuccessMessage] = useState<string>("");

  const requiereAcudiente = watch("requiere_acudiente");

  const tipos_documento = [
    "Tarjeta de identidad",
    "Registro civil",
    "Cédula de ciudadanía",
    "Documento extranjero",
  ];

  const grupos = [
    "Adultos sábados, de 8 a.m a 9 a.m",
    "Adultos sábados, de 9 a.m a 10 a.m",
    "Niños sábados, de 10 a.m a 11 a.m",
    "Adultos domingos, de 8 a.m a 9 a.m",
    "Adultos domingos, de 9 a.m a 10 a.m",
    "Niños domingos, de 10 a.m a 11 a.m",
    "Niños domingos, de 11 a.m a 12 m.",
  ];

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Formulario enviado:", data);
    setSuccessMessage("¡Inscripción enviada con éxito!");
  };

  const handleReset = () => {
    reset();
    setSuccessMessage("");
  };

  // Estilo base para los inputs y selects
  const inputStyle =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorInputStyle = "border-red-500 focus:ring-red-500";
  const errorTextStyle = "text-red-600 text-sm mt-1";

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
              Formulario de Inscripción Acuafit {new Date().getFullYear()}
            </h1>
            <p className="text-gray-500 text-center mb-6">
              * Indica campo obligatorio
            </p>

            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              onReset={handleReset}
              noValidate
            >
              {/* --- DATOS DEL ESTUDIANTE --- */}
              <div className="mb-4">
                <label
                  htmlFor="nombres_estudiante"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Nombres del estudiante *
                </label>
                <Input
                  type="text"
                  id="nombres_estudiante"
                  {...register("nombres_estudiante", {
                    required: "El nombre del estudiante es obligatorio.",
                  })}
                />
                {errors.nombres_estudiante && (
                  <p className={errorTextStyle}>
                    {errors.nombres_estudiante.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="apellidos_estudiante"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Apellidos del estudiante *
                </label>
                <Input
                  type="text"
                  id="apellidos_estudiante"
                  {...register("apellidos_estudiante", {
                    required: "Los apellidos del estudiante son obligatorios.",
                  })}
                />
                {errors.apellidos_estudiante && (
                  <p className={errorTextStyle}>
                    {errors.apellidos_estudiante.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tipo de documento de identidad del estudiante *
                </label>
                <div className="space-y-2">
                  {/* <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup> */}
                  {tipos_documento.map((tipo) => (
                    <div className="flex items-center" key={tipo}>
                      <Input
                        type="radio"
                        id={`tipo_documento_${tipo.replace(/\s+/g, "_")}`}
                        value={tipo}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        {...register("tipo_documento_estudiante", {
                          required: "Debe seleccionar un tipo de documento.",
                        })}
                      />
                      <label
                        htmlFor={`tipo_documento_${tipo.replace(/\s+/g, "_")}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {tipo}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.tipo_documento_estudiante && (
                  <p className={errorTextStyle}>
                    {errors.tipo_documento_estudiante.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="numero_documento_estudiante"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Número del documento de identidad del estudiante *
                </label>
                <Input
                  type="text"
                  id="numero_documento_estudiante"
                  {...register("numero_documento_estudiante", {
                    required: "El número de documento es obligatorio.",
                  })}
                />
                {errors.numero_documento_estudiante && (
                  <p className={errorTextStyle}>
                    {errors.numero_documento_estudiante.message}
                  </p>
                )}
              </div>

              <hr className="my-6" />

              {/* --- DATOS DEL ACUDIENTE (CONDICIONAL) --- */}
              <div className="mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="requiereAcudiente"
                    className=" block text-sm font-medium text-gray-700"
                  >
                    ¿El estudiante es menor de edad y/o requiere datos de
                    acudiente?
                  </label>
                  <div>
                    <Input
                      type="checkbox"
                      id="requiereAcudiente"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      {...register("requiere_acudiente")}
                    />
                  </div>
                </div>
              </div>

              {requiereAcudiente && (
                <div className="py-4  border-gray-200 rounded-md mb-6">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">
                    Datos del Acudiente
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="nombre_acudiente"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Nombre completo del acudiente *
                    </label>
                    <Input
                      type="text"
                      id="nombre_acudiente"
                      {...register("nombre_acudiente", {
                        required: requiereAcudiente
                          ? "El nombre del acudiente es obligatorio."
                          : false,
                      })}
                    />
                    {errors.nombre_acudiente && (
                      <p className={errorTextStyle}>
                        {errors.nombre_acudiente.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="numero_documento_acudiente"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Número de documento del acudiente *
                    </label>
                    <Input
                      type="text"
                      id="numero_documento_acudiente"
                      {...register("numero_documento_acudiente", {
                        required: requiereAcudiente
                          ? "El documento del acudiente es obligatorio."
                          : false,
                      })}
                    />
                    {errors.numero_documento_acudiente && (
                      <p className={errorTextStyle}>
                        {errors.numero_documento_acudiente.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* --- DATOS DE CONTACTO --- */}
              <hr className="my-6" />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
              <div className="mb-4">
                <label
                  htmlFor="email_contacto"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Correo electrónico de contacto *
                </label>
                <Input
                  type="email"
                  id="email_contacto"
                  {...register("email_contacto", {
                    required: "El correo es obligatorio.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Correo electrónico inválido.",
                    },
                  })}
                />
                {errors.email_contacto && (
                  <p className={errorTextStyle}>
                    {errors.email_contacto.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="celular_contacto"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Celular de contacto *
                </label>
                <Input
                  type="tel"
                  id="celular_contacto"
                  {...register("celular_contacto", {
                    required: "El número de celular es obligatorio.",
                  })}
                />
                {errors.celular_contacto && (
                  <p className={errorTextStyle}>
                    {errors.celular_contacto.message}
                  </p>
                )}
              </div>
              {/* </div> */}

              <div className="mb-4">
                <label
                  htmlFor="direccion_residencia"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Dirección completa de residencia (incluyendo ciudad) *
                </label>
                <Input
                  type="text"
                  id="direccion_residencia"
                  {...register("direccion_residencia", {
                    required: "La dirección es obligatoria.",
                  })}
                />
                {errors.direccion_residencia && (
                  <p className={errorTextStyle}>
                    {errors.direccion_residencia.message}
                  </p>
                )}
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
              <div className="mb-4">
                <label
                  htmlFor="numero_rut"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Número de RUT *
                </label>
                <Input
                  type="text"
                  id="numero_rut"
                  placeholder='Si no posee, escriba "No tengo"'
                  {...register("numero_rut", {
                    required: "Este campo es obligatorio.",
                  })}
                />
                {errors.numero_rut && (
                  <p className={errorTextStyle}>{errors.numero_rut.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="edad_estudiante"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Edad del estudiante (años cumplidos) *
                </label>
                <Input
                  type="number"
                  id="edad_estudiante"
                  {...register("edad_estudiante", {
                    required: "La edad es obligatoria.",
                    valueAsNumber: true,
                    min: { value: 1, message: "La edad debe ser mayor a 0." },
                  })}
                />
                {errors.edad_estudiante && (
                  <p className={errorTextStyle}>
                    {errors.edad_estudiante.message}
                  </p>
                )}
              </div>
              {/* </div> */}

              {/* --- INFORMACIÓN DEL CURSO --- */}
              <div className="mb-4">
                <label
                  htmlFor="sede"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Sede de preferencia *
                </label>
                <select
                  id="sede"
                  className={`${inputStyle} ${
                    errors.sede ? errorInputStyle : "border-gray-300"
                  }`}
                  {...register("sede", {
                    required: "Debe seleccionar una sede.",
                  })}
                >
                  <option value="" disabled>
                    Seleccione una sede...
                  </option>
                  <option value="Poblado">Poblado</option>
                  <option value="Castilla">Castilla</option>
                  <option value="La Estrella">La Estrella</option>
                </select>
                {errors.sede && (
                  <p className={errorTextStyle}>{errors.sede.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Elija el grupo de natación (día y horario) *
                </label>
                <div className="space-y-2">
                  {/* <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup> */}
                  {grupos.map((grupo) => (
                    <div className="flex items-center" key={grupo}>
                      <Input
                        type="radio"
                        id={`grupo_${grupo.replace(/\s+/g, "_")}`}
                        value={grupo}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        {...register("grupo_horario", {
                          required: "Debe seleccionar un grupo.",
                        })}
                      />
                      <label
                        htmlFor={`grupo_${grupo.replace(/\s+/g, "_")}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {grupo}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.grupo_horario && (
                  <p className={errorTextStyle}>
                    {errors.grupo_horario.message}
                  </p>
                )}
              </div>

              {/* --- AUTORIZACIONES --- */}
              <div className="space-y-6 mt-8">
                <div className="p-4 border border-gray-200 rounded-md">
                  <label className="block text-gray-700 font-medium">
                    Autorización de uso de imagen *
                  </label>
                  <p className="text-sm text-gray-500 my-2">
                    ¿Permite el uso de fotografías y/o videos del estudiante
                    para fines publicitarios? Conoce más en:{" "}
                    <a
                      href="https://docs.google.com/document/d/1sub10661QHigJBqdSmgX181-YsMIPrUIgWr_XbLE5L8/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      documento de derechos de imagen
                    </a>
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      {/* <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">Option One</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Option Two</Label>
                        </div>
                      </RadioGroup> */}
                      <Input
                        type="radio"
                        id="autorizacion_si"
                        value="Sí autorizo"
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        {...register("autorizacion_imagen", {
                          required: "Debe seleccionar una opción.",
                        })}
                      />
                      <label
                        htmlFor="autorizacion_si"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Sí autorizo.
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="radio"
                        id="autorizacion_no"
                        value="No autorizo"
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        {...register("autorizacion_imagen", {
                          required: "Debe seleccionar una opción.",
                        })}
                      />
                      <label
                        htmlFor="autorizacion_no"
                        className="ml-2 text-sm text-gray-700"
                      >
                        No autorizo.
                      </label>
                    </div>
                  </div>
                  {errors.autorizacion_imagen && (
                    <p className={errorTextStyle}>
                      {errors.autorizacion_imagen.message}
                    </p>
                  )}
                </div>

                <div className="p-4 border border-gray-200 rounded-md">
                  <label className="block text-gray-700 font-medium mb-2">
                    Aceptación del Reglamento Acuafit *
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Conoce más en:{" "}
                    <a
                      href="https://docs.google.com/document/d/112yqhEhp1Zf0CwjOjEYGqIEC5pYjbHiuJv2HKsOKBhU/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      reglamento Acuafit
                    </a>
                  </p>
                  <div className="flex items-center">
                    <Input
                      type="checkbox"
                      id="acuerdo_reglamento"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      {...register("acuerdo_reglamento", {
                        required: "Debe aceptar el reglamento para continuar.",
                      })}
                    />
                    <label
                      htmlFor="acuerdo_reglamento"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      He leído y acepto el reglamento de Acuafit.
                    </label>
                  </div>
                  {errors.acuerdo_reglamento && (
                    <p className={errorTextStyle}>
                      {errors.acuerdo_reglamento.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- BOTONES DE ACCIÓN --- */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
                <Button type="submit" className="bg-primary">
                  Enviar Inscripción
                </Button>
                <Button type="reset" className="bg-foreground hover:bg-muted-foreground">
                  Limpiar Formulario
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InscripcionAcuafitForm;
