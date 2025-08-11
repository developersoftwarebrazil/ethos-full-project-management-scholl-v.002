import Annoucements from "@/components/Events/Annoucements";
import BigCalendar from "@/components/Events/BigCalendar";
import EventCalendar from "@/components/Events/EventCalendar";

const TeacherPage = () => {
  return (
    <div className="flex flex-col xl:flex-row g-4 p-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full rounded-md bg-white p-4">
          <h1 className="text-xl font-semibold">Schedle</h1>
          <BigCalendar data={[]} />
        </div>
      </div>
      {/* RIGHT */}
      <div className=" flex-1 w-full xl:w-1/3 gap-8">
        <Annoucements />
      </div>
    </div>
  );
};

export default TeacherPage;
