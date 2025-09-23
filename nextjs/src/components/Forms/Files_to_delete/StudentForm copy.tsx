"use client";

import { BaseFormProps } from "@/lib/types/forms";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../Inputs/InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "The username must be at least 3 characters long." })
    .max(20, { message: "The username must be at most 20 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "The password must be at least 6 characters long." }),
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name must be at most 50 characters long." }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name must be at most 50 characters long." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  address: z
    .string()
    .min(1, { message: "Address is required." })
    .max(100, { message: "Address must be at most 100 characters long." }),
  birthday: z.date({
    message: "Invalid date of birth.",
  }),
  sex: z.enum(["male", "female"], {
    message: "Sex is required and must be either 'male' or 'female'.",
  }),
  img: z.instanceof(File, {
    message: "Image is required and must be a valid file.",
  }),
});

type Inputs = z.infer<typeof schema>;
const StudentForm = ({
  type,
  data,
}: BaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data);
    // Handle form submission logic here
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create new student</h1>
      <span className="text-us text-gray-400  font-medium">
        Authentication Information
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="Username"
          name="username"
          type="text"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-us text-gray-400  font-medium">
        Personal Information
      </span>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          defaultValue={data?.firstName}
          register={register}
          error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          defaultValue={data?.lastName}
          register={register}
          error={errors?.lastName}
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          type="text"
          defaultValue={data?.address}
          register={register}
          error={errors?.address}
        />
        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          defaultValue={data?.birthday}
          register={register}
          error={errors?.birthday}
        />

        <div className="flex flex-col justify-center w-full md:w-1/4 gap-4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 rounded-md   w-full p-2"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors?.sex && (
            <span className="text-red-400 text-xs">
              {errors.sex.message?.toString()}
            </span>
          )}
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
          {errors?.img?.message && (
            <span className="text-red-400 text-xs">
              {errors.img.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <button className="bg-blue-400 p-2 text-white rounded-md">
        {type === "create" ? "Create" : "Update"} Teacher
      </button>
    </form>
  );
};

export default StudentForm;
