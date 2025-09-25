"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

import InputField from "../Inputs/InputField";
import { BaseFormProps } from "@/lib/types/forms";
import {
  createUserAndTeacher,
  updateUserAndTeacher,
} from "@/lib/api/workflows/teacher";
import { useAutoUsername } from "@/lib/hooks/useAutoUsername";
import { useState } from "react";

type Inputs = {
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  description?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  sex: "MALE" | "FEMALE";
  img?: FileList;
  hire_date?: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
};

const TeacherForm = ({ type, data, onSuccess }: BaseFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: data
      ? {
          username: data.user?.username,
          email: data.user?.email,
          first_name: data.user?.first_name,
          last_name: data.user?.last_name,
          description: data.user?.description || "",
          phone: data.user?.phone,
          address: data.user?.address,
          birthday: data.birthday,
          sex: data.sex,
          hire_date: data.hire_date,
          bloodType: data.bloodType,
        }
      : {},
  });
  const firstName = watch("first_name");
  const lastName = watch("last_name");

  //Estado para saber se username existe
  const [usernameExists, setUsernameExists] = useState(false);

  // Hook para gerar username automaticamente
  useAutoUsername(
    firstName || "",
    lastName || "",
    setValue,
    "username",
    setUsernameExists
  );

  const onSubmit = async (formData: Inputs) => {
    try {
      if (usernameExists && type === "create") {
        alert(
          "Este username já existe. Será gerado automaticamente a partir de Nome + Sobrenome."
        );
        return;
      }

      if (type === "create") {
        const { user, teacher } = await createUserAndTeacher(formData);
        console.log("✅ Teacher criado:", teacher);
        alert(`Teacher ${user.username} criado com sucesso!`);
      } else if (type === "update" && data) {
        const { user, teacher } = await updateUserAndTeacher(
          formData,
          data.user.id,
          data.id
        );
        console.log("✅ Teacher atualizado:", teacher);
        alert(`Teacher ${user.username} atualizado com sucesso!`);
      }
      if (onSuccess) onSuccess(); // <-- fechar modal e atualizar lista
    } catch (err) {
      console.error("❌ Erro:", err);
      alert("Erro ao salvar Teacher. Veja o console.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar Professor" : "Atualizar Professor"}
      </h1>

      <span className="text-us text-gray-400 font-medium">
        Informações de Autentificação
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col w-full ">
          {usernameExists && (
            <span className="text-red-500 text-xs mt-1">
              Este username já existe. Será gerado automaticamente a partir de
              Nome + Sobrenome.
            </span>
          )}
        </div>
        <InputField
          label="E-mail"
          name="email"
          type="email"
          register={register}
          error={errors?.email}
        />
        {type === "create" && (
          <InputField
            label="Senha"
            name="password"
            type="password"
            register={register}
            error={errors?.password}
          />
        )}
      </div>

      <span className="text-us text-gray-400 font-medium">
        Informações Pessoais
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="Nome"
          name="first_name"
          type="text"
          register={register}
          error={errors?.first_name}
        />
        <InputField
          label="Sobrenome"
          name="last_name"
          type="text"
          register={register}
          error={errors?.last_name}
        />
        <InputField
          label="Descrição"
          name="description"
          type="text"
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Telefone"
          name="phone"
          type="tel"
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Endereço"
          name="address"
          type="text"
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Data de Nascimento"
          name="birthday"
          type="date"
          register={register}
          error={errors?.birthday}
        />
        <InputField
          label="Data de Contratação"
          name="hire_date"
          type="date"
          register={register}
          error={errors?.hire_date}
        />

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Tipo Sanguíneo</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2"
            {...register("bloodType")}
            defaultValue={data?.bloodType}
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Sexo</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
          </select>
        </div>

        <div className="flex flex-col w-full justify-center md:w-1/4">
          <label
            className="text-xs text-gray-500 items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Fazer Upload de foto</span>
          </label>
          <input
            type="file"
            id="img"
            {...register("img")}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Criar" : "Atualizar"} Professor
      </button>
    </form>
  );
};

export default TeacherForm;
