"use client";

import { useEffect, useState } from "react";
import Annoucements from "@/components/Events/Annoucements";
import Performance from "@/components/Charts/Performance";
import BigCalendar from "@/components/Events/BigCalendar";
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";

// Tipagem simples (sem zod)
interface Student {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  description?: string;
  phone?: string;
  address?: string;
  img?: string;
  sex?: string;
  bloodType?: string;
  birthday?: string;
  grade?: number;
  classroom?: number;
  createdAt?: string;
}

const SingleStudentPage = () => {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/students/1/"); // 🔧 trocar por ID dinâmico
        if (!res.ok) throw new Error("Erro ao buscar estudante");
        const data = await res.json();

        // ⚡️ Se a API retornar nested { user, ... }, pode precisar ajustar aqui
        setStudent({
          id: data.user.id,
          username: data.user.username,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          description: data.user.description,
          phone: data.user.phone,
          address: data.user.address,
          img: data.user.img,
          sex: data.sex,
          bloodType: data.bloodType,
          birthday: data.birthday,
          grade: data.grade,
          classroom: data.classroom,
          createdAt: data.createdAt,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudent();
  }, []);

  if (!student) {
    return <p className="p-4">Carregando estudante...</p>;
  }

  return (
    <div className="flex flex-col p-4 gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex  flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="flex flex-col flex-1 sm:flex-row items-center sm:items-start bg-lamaSky rounded-md p-4 gap-4 text-center sm:text-left">
            {/* Foto */}
            <div className="w-24 h-24 flex m-auto sm:w-36 sm:h-36">
              <Image
                src={student.img || "/default-user.png"}
                alt={student.username}
                width={144}
                height={144}
                className="rounded-full  w-24 h-24 object-cover sm:w-36 sm:h-36 shrink-0"
              />
            </div>

            <div className="flex flex-col justify-between w-1/2 lg:w-1/2 gap-4">
              <h1 className="text-xl font-semibold">
                {student.first_name} {student.last_name}
              </h1>
              <FormModel table="student" type="update" data={student} />
            
              <p className="text-sm text-gray-500">
                {student.description || "Sem descrição disponível."}
              </p>
              <div className="flex flex-wrap items-center text-xs font-medium gap-4">
                {/* Blood type */}
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span className="truncate">{student.bloodType || "N/A"}</span>
                </div>

                {/* Birthday */}
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span className="truncate">{student.birthday || "N/A"}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span className="truncate">{student.email}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="truncate">{student.phone || "N/A"}</span>
                </div>
              </div>

              {/* <div className="flex flex-wrap items-center justify-between text-xs font-medium gap-4">
                <div className="w-full md:w-1/4 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">
                    {student.bloodType || "N/A"}
                  </span>
                </div>
                <div className="w-full md:w-1/4 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">
                    {student.birthday || "N/A"}
                  </span>
                </div>
                <div className="w-full md:w-1/4 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">{student.email}</span>
                </div>
                <div className="w-full md:w-1/4 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">{student.phone || "N/A"}</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex flex-1 flex-wrap  justify-between gap-4">
            <div className="bg-white  flex justify-center items-center w-full rounded-md gap-4 p-4 md:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={48}
                height={48}
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center  w-full rounded-md gap-4 p-4 md:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={48} height={48} />
              <div>
                <h1 className="text-xl font-semibold">
                  {student.grade || "N/A"}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center  w-full rounded-md gap-4 p-4 md:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={48} height={48} />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center  w-full rounded-md gap-4 p-4 md:w-[48%]">
              <Image src="/singleClass.png" alt="" width={48} height={48} />
              <div>
                <h1 className="text-xl font-semibold">
                  {student.classroom || "N/A"}
                </h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="bg-white rounded-md h-[800px] mt-4">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar data={[]} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col w-full xl:w-1/3 gap-4">
        <div className="bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="flex flex-wrap text-xs text-gray-500 gap-4 mt-4">
            <Link className="rounded-md p-3 bg-lamaSkyLight" href={"/"}>
              Student&apos;s Classes
            </Link>
            <Link className="rounded-md p-3 bg-lamaPurpleLight" href={"/"}>
              Student&apos;s Students
            </Link>
            <Link className="rounded-md p-3 bg-lamaYellowLight" href={"/"}>
              Student&apos;s Lessons
            </Link>
            <Link className="rounded-md p-3 bg-pink-50" href={"/"}>
              Student&apos;s Exams
            </Link>
            <Link className="rounded-md p-3 bg-lamaSkyLight" href={"/"}>
              Student&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Annoucements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
