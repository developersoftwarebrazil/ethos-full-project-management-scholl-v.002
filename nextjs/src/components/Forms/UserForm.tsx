"use client";

import { BaseFormProps } from "@/lib/types/forms";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "../Inputs/InputField";
import Image from "next/image";
import { useAutoUsername } from "@/lib/hooks/useAutoUsername";
import { findUserByUsername } from "@/lib/api/users";
import { createUserWithRole, updateUserGeneric } from "@/lib/api/workflows/user";
import { UserData } from "@/lib/types";

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
  sex?: "MALE" | "FEMALE";
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  img?: FileList;
};

const UserForm = ({ type, data, onSuccess }: BaseFormProps) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [existingUserData, setExistingUserData] = useState<UserData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {},
  });

  // 🔹 Preencher dados se for edição
  useEffect(() => {
    if (data) {
      reset({
        username: data.username || "",
        email: data.email || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        description: data.description || "",
        phone: data.phone || "",
        address: data.address || "",
        birthday: data.birthday || "",
        sex: data.sex || "",
        bloodType: data.bloodType || "",
      });
    }
  }, [data, reset]);

  // 🔹 Auto username
  const firstName = watch("first_name");
  const lastName = watch("last_name");
  useAutoUsername(firstName, lastName, setValue, "username");

  // 🔹 Verificar se username já existe
  const username = watch("username");
  useEffect(() => {
    if (!username || !firstName || !lastName) return;

    const checkUsername = async () => {
      try {
        const user = await findUserByUsername(username);
        if (user?.username === username) {
          setUsernameExists(true);
          setExistingUserData(user);

          reset((prev) => ({
            ...prev,
            email: prev.email || user.email || "",
            first_name: prev.first_name || user.first_name || "",
            last_name: prev.last_name || user.last_name || "",
            description: prev.description || user.description || "",
            birthday: prev.birthday || user.birthday || "",
            phone: prev.phone || user.phone || "",
            address: prev.address || user.address || "",
            bloodType: prev.bloodType || user.bloodType || "",
            sex: prev.sex || user.sex || "",
            username: user.username,
          }));
        } else {
          setUsernameExists(false);
          setExistingUserData(null);
        }
      } catch (err) {
        console.error("❌ Erro ao verificar username:", err);
      }
    };

    checkUsername();
  }, [username, firstName, lastName, reset]);

  // 🔹 Submissão do formulário
  const onSubmit = async (formData: Inputs) => {
    try {
      const payload = {
        ...formData,
        description: formData.description || "",
        sex: formData.sex || "",
        bloodType: formData.bloodType || "",
        birthday: formData.birthday || null,
        phone: formData.phone || "",
        address: formData.address || "",
      };

      if (type === "create") {
        if (existingUserData) {
          alert(`Usuário ${existingUserData.username} já existe!`);
        } else {
          const { user } = await createUserWithRole(payload);
          alert(`Usuário ${user.username} criado com sucesso!`);
        }
      } else if (type === "update" && data) {
        const { user } = await updateUserGeneric(payload, data.id);
        alert(`Usuário ${user.username} atualizado com sucesso!`);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Erro ao salvar usuário:", err);
      alert("Erro ao salvar usuário. Veja o console.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar Usuário" : "Atualizar Usuário"}
      </h1>

      <span className="text-us text-gray-400 font-medium">
        Informações de Autentificação
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <input type="hidden" {...register("username")} />
        <InputField label="E-mail" name="email" type="email" register={register} error={errors?.email} />
        {type === "create" && (
          <InputField label="Senha" name="password" type="password" register={register} error={errors?.password} />
        )}
      </div>

      {usernameExists && (
        <p className="text-sm mt-1 text-red-500">
          Username gerado ({username}) já existe — campos preenchidos automaticamente
        </p>
      )}

      <span className="text-us text-gray-400 font-medium">
        Informações Pessoais
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField label="Nome" name="first_name" type="text" register={register} error={errors?.first_name} />
        <InputField label="Sobrenome" name="last_name" type="text" register={register} error={errors?.last_name} />
        <InputField label="Descrição" name="description" type="text" register={register} error={errors?.description} />
        <InputField label="Telefone" name="phone" type="tel" register={register} error={errors?.phone} />
        <InputField label="Endereço" name="address" type="text" register={register} error={errors?.address} />
        <InputField label="Data de Nascimento" name="birthday" type="date" register={register} error={errors?.birthday} />

        {/* Tipo sanguíneo */}
        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Tipo Sanguíneo</label>
          <select className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2" {...register("bloodType")}>
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

        {/* Sexo */}
        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Sexo</label>
          <select className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2" {...register("sex")}>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
          </select>
        </div>

        {/* Upload de foto */}
        <div className="flex flex-col w-full justify-center md:w-1/4">
          <label className="text-xs text-gray-500 items-center gap-2 cursor-pointer" htmlFor="img">
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Fazer Upload de foto</span>
          </label>
          <input type="file" id="img" {...register("img")} accept="image/*" className="hidden" />
        </div>
      </div>

      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Criar" : "Atualizar"} Usuário
      </button>
    </form>
  );
};

export default UserForm;
