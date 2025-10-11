"use client";

import { BaseFormProps } from "@/lib/types/forms";
import { FieldError, useForm } from "react-hook-form";
import { useEffect } from "react";
import InputField from "../Inputs/InputField";
import { Course } from "@/lib/types";
import { createOrUpdateCourse } from "@/lib/api/courses";

type Inputs = {
  titleCourse: string;
  description: string;
  classrooms?: string; // IDs como string separadas por vírgula no input
  subjects?: string;   // IDs como string separadas por vírgula no input
};

const CourseForm = ({ type, data, onSuccess }: BaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {},
  });

  // 🔹 Preencher dados do curso para edição
  useEffect(() => {
    if (data) {
      reset({
        titleCourse: data.titleCourse || "",
        description: data.description || "",
        classrooms: data.classrooms?.map((c: { id: number }) => c.id).join(",") || "",
        subjects: data.subjects?.map((s: { id: number }) => s.id).join(",") || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: Inputs) => {
    try {
      // 🔹 Converter strings separadas por vírgula em array de números
      const payload = {
        ...formData,
        classrooms: formData.classrooms
          ? formData.classrooms.split(",").map((id) => Number(id.trim()))
          : [],
        subjects: formData.subjects
          ? formData.subjects.split(",").map((id) => Number(id.trim()))
          : [],
      };

      let course: Course;
      if (type === "create") {
        course = await createOrUpdateCourse(payload, "create");
        alert(`Curso "${course.titleCourse}" criado com sucesso!`);
      } else if (type === "update" && data) {
        course = await createOrUpdateCourse(payload, "update", data.id);
        alert(`Curso "${course.titleCourse}" atualizado com sucesso!`);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Erro ao salvar Course:", err);
      alert("Erro ao salvar Course. Veja o console.");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Criar Curso" : "Atualizar Curso"}
      </h1>

      <InputField
        label="Título do Curso"
        name="titleCourse"
        type="text"
        register={register}
        error={errors?.titleCourse as FieldError}
      />

      <InputField
        label="Descrição"
        name="description"
        type="text"
        register={register}
        error={errors?.description as FieldError}
      />

      <InputField
        label="Turmas (IDs separadas por vírgula)"
        name="classrooms"
        type="text"
        register={register}
        error={errors?.classrooms as FieldError}
      />

      <InputField
        label="Disciplinas (IDs separadas por vírgula)"
        name="subjects"
        type="text"
        register={register}
        error={errors?.subjects as FieldError}
      />

      <button className="bg-blue-500 text-white p-2 rounded-md">
        {type === "create" ? "Criar" : "Atualizar"} Curso
      </button>
    </form>
  );
};

export default CourseForm;
