"use client";

import { BaseFormProps } from "@/lib/types/forms";

import { useForm } from "react-hook-form";
import InputField from "../Inputs/InputField";
import Image from "next/image";
import { createUserAndTeacher, updateUserAndTeacher } from "@/lib/api";

type Inputs = {
  username: string;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  birthday?: string;
  sex: "MALE" | "FEMALE";
  img?: FileList;
  hire_date?: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
};

const TeacherForm = ({
  type,
  data,
  onSuccess,
}: BaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: data
      ? {
          username: data.user?.username,
          email: data.user?.email,
          first_name: data.user?.first_name,
          last_name: data.user?.last_name,
          phone: data.user?.phone,
          address: data.user?.address,
          birthday: data.birthday,
          sex: data.sex,
          hire_date: data.hire_date,
          bloodType: data.bloodType,
        }
      : {},
  });

  const onSubmit = async (formData: Inputs) => {
    try {
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
        {type === "create" ? "Create new teacher" : "Update teacher"}
      </h1>

      <span className="text-us text-gray-400 font-medium">
        Authentication Information
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
        {type === "create" && (
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
        Personal Information
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="First Name"
          name="first_name"
          type="text"
          register={register}
          error={errors?.first_name}
        />
        <InputField
          label="Last Name"
          name="last_name"
          type="text"
          register={register}
          error={errors?.last_name}
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          type="text"
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          register={register}
          error={errors?.birthday}
        />
        <InputField
          label="Hire Date"
          name="hire_date"
          type="date"
          register={register}
          error={errors?.hire_date}
        />
        {/* <InputField
          label="Blood Type"
          name="bloodType"
          type="text"
          register={register}
          error={errors?.bloodType}
        /> */}

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Blood Type</label>
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
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md w-full p-2"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div className="flex flex-col w-full justify-center md:w-1/4">
          <label
            className="text-xs text-gray-500 items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
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
        {type === "create" ? "Create" : "Update"} Teacher
      </button>
    </form>
  );
};

export default TeacherForm;
