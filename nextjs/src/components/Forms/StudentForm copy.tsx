"use client";

import { BaseFormProps } from "@/lib/types/forms";
import { useForm } from "react-hook-form";
import InputField from "../Inputs/InputField";
import Image from "next/image";
import { createUserAndStudent, updateUserAndStudent } from "@/lib/api/workflows/student";
import { useAutoUsername } from "@/lib/hooks/useAutoUsername";

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
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
};

const StudentForm = ({ type, data, onSuccess }: BaseFormProps) => {
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
          bloodType: data.bloodType,
        }
      : {},
  });

  const firstName = watch("first_name");
  const lastName = watch("last_name");

  // Hook para gerar username automaticamente
  useAutoUsername(firstName || "", lastName || "", setValue, "username");

  const onSubmit = async (formData: Inputs) => {
    try {
      if (type === "create") {
        const { user, student } = await createUserAndStudent(formData);
        console.log("✅ Student criado:", student);
        alert(`Student ${user.username} criado com sucesso!`);
      } else if (type === "update" && data) {
        const { user, student } = await updateUserAndStudent(
          formData,
          data.user.id,
          data.id
        );
        console.log("✅ Student atualizado:", student);
        alert(`Student ${user.username} atualizado com sucesso!`);
      }
      if (onSuccess) onSuccess(); // fechar modal e atualizar lista
    } catch (err) {
      console.error("❌ Erro:", err);
      alert("Erro ao salvar Student. Veja o console.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar Aluno" : "Atualizar Aluno"}
      </h1>

      <span className="text-us text-gray-400 font-medium">Informações de Autentificação</span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField label="Nome de Usuário" name="username" type="text" register={register} error={errors?.username}  />
        <InputField label="E-mail" name="email" type="email" register={register} error={errors?.email} />
        {type === "create" && (
          <InputField label="Senha" name="password" type="password" register={register} error={errors?.password} />
        )}
      </div>

      <span className="text-us text-gray-400 font-medium">Informações Pessoais</span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField label="Nome" name="first_name" type="text" register={register} error={errors?.first_name} />
        <InputField label="Sobrenome" name="last_name" type="text" register={register} error={errors?.last_name} />
        <InputField label="Descrição" name="description" type="text" register={register} error={errors?.description} />
        <InputField label="Telefone" name="phone" type="tel" register={register} error={errors?.phone} />
        <InputField label="Endereço" name="address" type="text" register={register} error={errors?.address} />
        <InputField label="Data de Nascimento" name="birthday" type="date" register={register} error={errors?.birthday} />

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Tipo Sanguíneo</label>
          <select className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2" {...register("bloodType")} defaultValue={data?.bloodType}>
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
          <select className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2" {...register("sex")} defaultValue={data?.sex}>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
          </select>
        </div>

        <div className="flex flex-col w-full justify-center md:w-1/4">
          <label className="text-xs text-gray-500 items-center gap-2 cursor-pointer" htmlFor="img">
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Fazer Upload de foto</span>
          </label>
          <input type="file" id="img" {...register("img")} accept="image/*" className="hidden" />
        </div>
      </div>

      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Criar" : "Atualizar"} Aluno
      </button>
    </form>
  );
};

export default StudentForm;
