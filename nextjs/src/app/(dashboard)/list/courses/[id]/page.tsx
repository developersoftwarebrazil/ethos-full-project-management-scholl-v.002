// app/list/courses/[id]/page.tsx
import Annoucements from "@/components/Events/Annoucements";
import Performance from "@/components/Charts/Performance";
import BigCalendar from "@/components/Events/BigCalendar";
import Image from "next/image";
import FormModel from "@/components/Forms/FormModel";
import Shortcuts from "@/components/Shortcuts/Shortcut";

import { Role } from "@/lib/types";
import { Course } from "@/lib/types/course";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const courseRole: Role = { id: 3, name: "course" }; // id ajustado para course

export default async function SingleCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course: Course | null = await fetch(
    `${API_URL}/api/courses/${params.id}/`,
    {
      cache: "no-store",
    }
  ).then((res) => (res.ok ? res.json() : null));

  if (!course) return <p>Curso não encontrado</p>;

  return (
    <div className="flex flex-col p-4 gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-3/3">
        {/* COURSE INFO CARD */}
        <div className="flex flex-col flex-1 sm:flex-row items-center sm:items-start bg-lamaSky rounded-md p-4 gap-4 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center bg-white rounded-full">
            <Image
              src={"/course.png"}
              alt={course.titleCourse}
              width={80}
              height={80}
              className="object-contain "
            />
          </div>

          <div className="flex flex-col justify-between w-1/2 lg:w-1/2 gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">{course.titleCourse}</h1>
              <FormModel table="course" type="update" data={course} />
            </div>
            <p className="text-sm text-gray-500">
              {course.description || "Sem descrição"}
            </p>

            <div className="flex flex-wrap items-center justify-between text-xs font-medium gap-4">
              <div className="w-full md:w-1/2 flex items-center gap-2">
                <Image src="/singleClass.png" alt="" width={14} height={14} />
                <span>{course.classrooms.length} Turmas</span>
              </div>
              <div className="w-full md:w-1/2 flex items-center gap-2">
                <Image src="/subject.png" alt="" width={14} height={14} />
                <span>{course.subjects.length} Disciplinas</span>
              </div>
            </div>
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="flex flex-1 flex-wrap justify-between gap-4 mt-4">
          <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
            <Image src="/exam.png" alt="" width={24} height={24} />
            <div>
              <h1 className="text-xl font-semibold">
                {/* Aqui pode colocar total de provas se tiver no backend */}
              </h1>
              <span className="text-sm text-gray-400">Provas</span>
            </div>
          </div>
          <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
            <Image src="/assignment.png" alt="" width={24} height={24} />
            <div>
              <h1 className="text-xl font-semibold">
                {/* Aqui pode colocar total de atividades se tiver no backend */}
              </h1>
              <span className="text-sm text-gray-400">Atividades</span>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        {/* <div className="bg-white rounded-md h-[800px] mt-4">
          <h1>Agenda do Curso</h1>
          <BigCalendar data={[]} />
        </div> */}
      </div>

      {/* RIGHT */}
      {/* <div className="flex flex-col w-full xl:w-1/3 gap-4">
        <div className="bg-white rounded-md p-4">
          <Shortcuts title="Atalhos" role={courseRole} />
        </div>
        <Performance />
        <Annoucements /> 
      </div> */}
    </div>
  );
}




// import Annoucements from "@/components/Events/Annoucements";
// import Performance from "@/components/Charts/Performance";
// import BigCalendar from "@/components/Events/BigCalendar";
// import Image from "next/image";
// import FormModel from "@/components/Forms/FormModel";
// import Shortcuts from "@/components/Shortcuts/Shortcut";

// import { Role } from "@/lib/types";
// import { Subject } from "@/lib/types/subject";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const subjectRole: Role = { id: 2, name: "subject" };

// export default async function SingleSubjectPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const subject: Subject | null = await fetch(
//     `${API_URL}/api/subjects/${params.id}/`,
//     {
//       cache: "no-store",
//     }
//   ).then((res) => (res.ok ? res.json() : null));

//   if (!subject) return <p>Matéria não encontrada</p>;

//   return (
//     <div className="flex flex-col p-4 gap-4 xl:flex-row">
//       {/* LEFT */}
//       <div className="w-full xl:w-3/3">
//         {/* SUBJECT INFO CARD */}
//         <div className="flex flex-col flex-1 sm:flex-row items-center sm:items-start bg-lamaSky rounded-md p-4 gap-4 text-center sm:text-left">
//           <div className="w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center bg-white rounded-full">
//             <Image
//               src={"/teacher.png"}
//               alt={subject.name}
//               width={80}
//               height={80}
//               className="object-contain "
//             />
//           </div>

//           <div className="flex flex-col justify-between w-1/2 lg:w-1/2 gap-4">
//             <div className="flex items-center gap-4">
//               <h1 className="text-xl font-semibold">{subject.name}</h1>
//               <FormModel table="subject" type="update" data={subject} />
//             </div>
//             <p className="text-sm text-gray-500">
//               {subject.description || "Sem descrição"}
//             </p>

//             <div className="flex flex-wrap items-center justify-between text-xs font-medium gap-4">
//               <div className="w-full md:w-1/2 flex items-center gap-2">
//                 <Image src="/teacher.png" alt="" width={14} height={14} />
//                 <span>Professores | {(subject.teachers || []).map((teacher)=>teacher.user.first_name).join(', ')}</span>
//               </div>
//               <div className="w-full md:w-1/2 flex items-center gap-2">
//                 <Image src="/singleClass.png" alt="" width={14} height={14} />
//                 <span>{(subject.classrooms || []).length} Turmas</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* SMALL CARDS */}
//         <div className="flex flex-1 flex-wrap justify-between gap-4 mt-4">
//           <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
//             <Image src="/exam.png" alt="" width={24} height={24} />
//             <div>
//               <h1 className="text-xl font-semibold">
//                 {/* {(subject.exams || []).length} */}
//               </h1>
//               <span className="text-sm text-gray-400">Provas</span>
//             </div>
//           </div>
//           <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%]">
//             <Image src="/assignment.png" alt="" width={24} height={24} />
//             <div>
//               <h1 className="text-xl font-semibold">
//                 {/* {(subject.assignments || []).length} */}
//               </h1>
//               <span className="text-sm text-gray-400">Atividades</span>
//             </div>
//           </div>
//         </div>

//         {/* BOTTOM */}
//         {/* <div className="bg-white rounded-md h-[800px] mt-4">
//           <h1>Agenda da Matéria</h1>
//           <BigCalendar data={[]} />
//         </div> */}
//       </div>

//       {/* RIGHT */}
//       {/* <div className="flex flex-col w-full xl:w-1/3 gap-4">
//         <div className="bg-white rounded-md p-4">
//           <Shortcuts title="Atalhos" role={subjectRole} />
//         </div>
//         <Performance />
//         <Annoucements /> 
//       </div> */}
//     </div>
//   );
// }
