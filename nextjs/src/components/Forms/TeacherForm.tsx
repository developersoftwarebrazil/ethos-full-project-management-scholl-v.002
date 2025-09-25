"use client";

import { BaseFormProps } from "@/lib/types/forms";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "../Inputs/InputField";
import Image from "next/image";
import { useAutoUsername } from "@/lib/hooks/useAutoUsername";
import { findUserByUsername } from "@/lib/api/users";
import { createOrUpdateTeacher } from "@/lib/api/teachers";
import { createUserAndTeacher, updateUserAndTeacher } from "@/lib/api/workflows/teacher";
import { UserData, Teacher } from "@/lib/types";

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
  hire_date?: string;
  sex: "MALE" | "FEMALE";
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  img?: FileList;
  teaching_subjects?: string[];
  teaching_classrooms?: string[];
  supervised_classrooms?: string[];
};

const TeacherForm = ({ type, data, onSuccess }: BaseFormProps) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [existingUserData, setExistingUserData] = useState<UserData | null>(null);

  const {
    register,
    handleSubmit,
    control,
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
        username: data.user?.username || "",
        email: data.user?.email || "",
        first_name: data.user?.first_name || "",
        last_name: data.user?.last_name || "",
        description: data.user?.description || "",
        phone: data.user?.phone || "",
        address: data.user?.address || "",
        birthday: data.birthday || "",
        hire_date: data.hire_date || "",
        sex: data.sex || "MALE",
        bloodType: data.bloodType || "A+",
        // teaching_subjects: data.teaching_subjects?.map(s => s.subject_name) || [],
        // teaching_classrooms: data.teaching_classrooms?.map(c => c.classroom_name) || [],
        // supervised_classrooms: data.supervised_classrooms?.map(c => c.name) || [],
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
        const user = (await findUserByUsername(username)) as UserData | null;
        const matchedUser = user?.username === username ? user : null;

        if (matchedUser) {
          setUsernameExists(true);
          setExistingUserData(matchedUser);

          reset(prev => ({
            ...prev,
            email: prev.email || matchedUser.email || "",
            first_name: prev.first_name || matchedUser.first_name || "",
            last_name: prev.last_name || matchedUser.last_name || "",
            description: prev.description || matchedUser.description || "",
            birthday: prev.birthday || matchedUser.birthday || "",
            phone: prev.phone || matchedUser.phone || "",
            address: prev.address || matchedUser.address || "",
            username: matchedUser.username,
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
      if (type === "create") {
        if (existingUserData) {
          const teacher = await createOrUpdateTeacher(formData, existingUserData.id, "create");
          console.log("✅ Teacher criado (usuário existente):", teacher);
          alert(`Professor vinculado ao usuário ${existingUserData.username}!`);
        } else {
          const { user, teacher } = await createUserAndTeacher(formData);
          console.log("✅ Teacher criado:", teacher);
          alert(`Professor ${user.username} criado com sucesso!`);
        }
      } else if (type === "update" && data) {
        const { user, teacher } = await updateUserAndTeacher(formData, data.user.id, data.id);
        console.log("✅ Teacher atualizado:", teacher);
        alert(`Professor ${user.username} atualizado com sucesso!`);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Erro ao salvar Teacher:", err);
      alert("Erro ao salvar Teacher. Veja o console.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Criar Professor" : "Atualizar Professor"}</h1>

      <span className="text-us text-gray-400 font-medium">Informações de Autentificação</span>
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

      <span className="text-us text-gray-400 font-medium">Informações Pessoais</span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField label="Nome" name="first_name" type="text" register={register} error={errors?.first_name} />
        <InputField label="Sobrenome" name="last_name" type="text" register={register} error={errors?.last_name} />
        <InputField label="Descrição" name="description" type="text" register={register} error={errors?.description} />
        <InputField label="Telefone" name="phone" type="tel" register={register} error={errors?.phone} />
        <InputField label="Endereço" name="address" type="text" register={register} error={errors?.address} />
        <InputField label="Data de Nascimento" name="birthday" type="date" register={register} error={errors?.birthday} />
        <InputField label="Data de Contratação" name="hire_date" type="date" register={register} error={errors?.hire_date} />

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

        {/* Teaching subjects */}
        {/* <InputField label="Disciplinas" name="teaching_subjects" type="text" register={register} error={errors?.teaching_subjects} />
        {/* Teaching classrooms */}
        {/* <InputField label="Turmas ministradas" name="teaching_classrooms" type="text" register={register} error={errors?.teaching_classrooms} /> */}
        {/* Supervised classrooms */}
        {/* <InputField label="Turmas supervisionadas" name="supervised_classrooms" type="text" register={register} error={errors?.supervised_classrooms} /> */} 
      </div>

      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Criar" : "Atualizar"} Professor
      </button>
    </form>
  );
};

export default TeacherForm;
