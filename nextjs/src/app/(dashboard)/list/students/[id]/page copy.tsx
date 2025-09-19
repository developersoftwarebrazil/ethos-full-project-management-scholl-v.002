import Annoucements from "@/components/Events/Annoucements";
import Performance from "@/components/Charts/Performance";
import BigCalendar from "@/components/Events/BigCalendar";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
  return (
    <div className="flex flex-col  p-4 gap-4 xl:flex-row ">
      {/* LEFT  */}
      <div className="w-full xl:w-2/3">
        {/* TOP  */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD  */}
          {/* <div className=" flex flex-1 lg:flex-row bg-lamaSky rounded-md items-start p-4 gap-4 ">
            <div className="w-1/4">
              <Image
                src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="rounded-full w-36 h-36 object-cover"
              />
            </div>
            <div className="flex flex-col justify-between w-2/4 gap-4">
              <h1 className="text-xl font-semibold">Lana Simpsons</h1>
              <p className="text-sm text-gray-500">
                History Student and arts. He loves modern arts.
              </p>
              <div className="flex flex-wrap  items-center justify-between text-xs font-medium  gap-x-6 gap-y-2">
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">A+</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">January 2025</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">contact@user.com</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">19 99999-9999</span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex flex-col flex-1 sm:flex-row items-center sm:items-start bg-lamaSky rounded-md p-4 gap-4 text-center sm:text-left ">
            {/* Foto */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 ">
              <Image
                src="https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="rounded-full w-24 h-24 object-cover sm:w-36 sm:h-36 shrink-0  "
              />
            </div>
            <div className="flex flex-col justify-between w-1/2 lg:w-1/2 gap-4 ">
              <h1 className="text-xl font-semibold">Lana Simpsons</h1>
              <p className="text-sm text-gray-500">
                History Student and arts. He loves modern arts.
              </p>
              <div className="flex flex-wrap  items-center justify-stretch text-xs font-medium  gap-4">
                <div className="w-full md:w-1/3  flex  items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">A+</span>
                </div>
                <div className="w-full md:w-1/3  flex  items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">January 2025</span>
                </div>
                <div className="w-full md:w-1/3  flex  items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">contact@user.com</span>
                </div>
                <div className="w-full md:w-1/3  flex  items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span className="text-nowrap">19 99999-9999</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className="flex flex-1 flex-wrap justify-between gap-4">
            {/* CARD  */}
            <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white flex w-full rounded-md gap-4 p-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className="bg-white rounded-md h-[800px] mt-4">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar data={[]} />
        </div>
      </div>
      {/* RIGHT  */}
      <div className="flex flex-col w-full  xl:w-1/3 gap-4">
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
