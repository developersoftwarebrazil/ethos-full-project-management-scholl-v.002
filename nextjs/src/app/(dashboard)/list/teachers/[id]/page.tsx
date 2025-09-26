import Annoucements from "@/components/Events/Annoucements";
import Performance from "@/components/Charts/Performance";
import BigCalendar from "@/components/Events/BigCalendar";
import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import Shortcuts from "@/components/Shortcuts/Shortcut";

// agora tudo vem centralizado
import { Teacher, Role } from "@/lib/types";
import { User } from "@clerk/nextjs/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const teacherRole: Role = { id: 1, name: "teacher" };

export default async function SingleTeacherPage({
  params,
}: {
  params: { id: string };
}) {
  const teacher: Teacher | null = await fetch(
    `${API_URL}/api/teachers/${params.id}/`,
    {
      cache: "no-store",
    }
  ).then((res) => (res.ok ? res.json() : null));

  if (!teacher) return <p>Professor não encontrado</p>;

  return (
    <div className="flex flex-col p-4 gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* USER INFO CARD */}
        <div className="flex flex-col flex-1 sm:flex-row items-center sm:items-start bg-lamaSky rounded-md p-4 gap-4 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-36 sm:h-36">
            <Image
              src={teacher.user.img || "/default-user.png"}
              alt={teacher.user.username}
              width={144}
              height={144}
              className="rounded-full w-24 h-24 object-cover sm:w-36 sm:h-36"
            />
          </div>

          <div className="flex flex-col justify-between w-1/2 lg:w-1/2 gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                {teacher.user.first_name} {teacher.user.last_name}
              </h1>
              
              <FormModel table="teacher" type="update" data={teacher} />
            </div>
            <p  className="text-sm text-gray-500">
              {teacher.user.description}
              </p>
            <div className="flex flex-wrap items-center justify-between text-xs font-medium gap-4">
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Image src="/blood.png" alt="" width={14} height={14} />
                <span>{teacher.user.bloodType}</span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Image src="/date.png" alt="" width={14} height={14} />
                <span>
                  {teacher.user.birthday
                    ? new Date(teacher.user.birthday).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Image src="/mail.png" alt="" width={14} height={14} />
                <span>{teacher.user.email}</span>
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-2">
                <Image src="/phone.png" alt="" width={14} height={14} />
                <span>{teacher.user.phone || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="flex flex-1 flex-wrap justify-between gap-4 mt-4">
          <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
            <Image src="/singleLesson.png" alt="" width={24} height={24} />
            <div>
              <h1 className="text-xl font-semibold">
                {(teacher.user.subjects || []).length}
              </h1>
              <span className="text-sm text-gray-400">Matérias</span>
            </div>
          </div>
          <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
            <Image src="/singleClass.png" alt="" width={24} height={24} />
            <div>
              <h1 className="text-xl font-semibold">
                {(teacher.supervised_classrooms || []).length}
              </h1>
              <span className="text-sm text-gray-400">Turmas</span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="bg-white rounded-md h-[800px] mt-4">
          <h1> Agenda do Professor</h1>
          <BigCalendar data={[]} />
        </div>
      </div>

   
      <div className="flex flex-col w-full xl:w-1/3 gap-4">
        <div className="bg-white rounded-md p-4">
          <Shortcuts title="Atalhos" role={teacherRole} />
        </div>
        <Performance />
        <Annoucements />
      </div>
    </div>
  );
}
