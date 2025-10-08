"use client";

import { BaseFormProps } from "@/lib/types/forms";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Dinâmico
const TeacherForm = dynamic(() => import("./TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});

// Mapeamento de forms
const forms: {
  [key: string]: (props: BaseFormProps) => JSX.Element;
} = {
  teacher: (props) => <TeacherForm {...props} />,
  student: (props) => <StudentForm {...props} />,
  subject: (props) => <SubjectForm {...props} />,
  // Adicione outros forms se necessário
};

const FormModel = ({
  table,
  data,
  type,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendence"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgCol0r =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    setOpen(false);
    router.refresh(); // atualiza a página
  };

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form className="flex flex-col p-4 gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="w-max self-center bg-red-700 text-white rounded-md border-none px-4 py-2">
            Delete
          </button>
        </form>
      );
    }

    if (type === "create" || type === "update") {
      return forms[table]({type, data, onSuccess:handleSuccess});
    }

    return <span className="text-red-500">Form not found.</span>;
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgCol0r}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={""} width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen left-0 top-0 absolute bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl::w-[40%] relative">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt={""} width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModel;
