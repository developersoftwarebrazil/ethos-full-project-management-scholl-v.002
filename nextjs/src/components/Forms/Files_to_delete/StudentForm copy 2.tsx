// src/components/Forms/StudentForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../Inputs/InputField";
import Image from "next/image";
import {
  createUserAndStudent,
  updateUserAndStudent,
} from "@/lib/files_to_delete/student_delete";
import { Student } from "@/lib/files_to_delete/student_original";
import { BaseFormProps } from "@/lib/types/forms";

// === SCHEMA DE VALIDAÇÃO ===
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "O username deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres." })
    .optional(),
  firstName: z.string().min(1, { message: "O nome é obrigatório." }),
  lastName: z.string().min(1, { message: "O sobrenome é obrigatório." }),
  phone: z.string().min(1, { message: "O telefone é obrigatório." }),
  address: z.string().min(1, { message: "O endereço é obrigatório." }),
  birthday: z
    .string()
    .min(1, { message: "A data de nascimento é obrigatória." }),
  sex: z.enum(["MALE", "FEMALE"]),
  img: z.any().optional(),
  bloodType: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .default("A+"),
  classroom: z.string().optional(),
  grade: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

interface StudentFormProps extends BaseFormProps {
  student?: Student;
  onSuccess?: (student: Student) => void;
}

const StudentForm = ({ type, data, student, onSuccess }: StudentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: student?.user.username || "",
      email: student?.user.email || "",
      password: "",
      firstName: student?.user.first_name || "",
      lastName: student?.user.last_name || "",
      phone: student?.user.phone || "",
      address: student?.user.address || "",
      birthday: student?.birthday || "",
      sex: student?.sex || "MALE",
      bloodType: student?.bloodType || "A+",
      classroom: student?.classroom?.toString() || "",
      grade: student?.grade?.toString() || "",
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      let result;
      if (student) {
        result = await updateUserAndStudent(
          formData,
          student.user.id,
          student.id
        );
      } else {
        result = await createUserAndStudent(formData);
      }
      onSuccess?.(result.student);
      alert("Aluno salvo com sucesso!");
    } catch (err: any) {
      alert("Erro: " + err.message);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar novo aluno" : "Atualizar aluno"}
      </h1>

      <span className="text-us text-gray-400 font-medium">
        Informações de Autenticação
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="Username"
          name="username"
          type="text"
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors?.email}
        />
        {!student && (
          <InputField
            label="Password"
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
          name="firstName"
          type="text"
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Sobrenome"
          name="lastName"
          type="text"
          register={register}
          error={errors?.lastName}
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

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-2">
          <label className="text-xs text-gray-500">Sexo</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2"
            {...register("sex")}
          >
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
          </select>
          {errors?.sex && (
            <span className="text-red-400 text-xs">
              {errors.sex.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-2">
          <label className="text-xs text-gray-500">Tipo Sanguíneo</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2"
            {...register("bloodType")}
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
              <option key={bt} value={bt}>
                {bt}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full justify-center md:w-1/4">
          <label
            className="text-xs text-gray-500 items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload Foto</span>
          </label>

          <input
            type="file"
            id="img"
            {...register("img")}
            accept="image/*"
            className="hidden"
          />
          {errors?.img?.message && (
            <span className="text-red-400 text-xs">
              {errors.img.message?.toString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="Turma"
          name="classroom"
          type="number"
          register={register}
          error={errors?.classroom}
        />
        <InputField
          label="Série"
          name="grade"
          type="number"
          register={register}
          error={errors?.grade}
        />
      </div>

      <button className="bg-blue-500 p-2 text-white rounded-md">
        {student ? "Atualizar" : "Criar"} Aluno
      </button>
    </form>
  );
};

export default StudentForm;
