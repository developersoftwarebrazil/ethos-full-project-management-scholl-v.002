import UserCard from "@/components/Admin/UserCard";
import AttendanceChart from "@/components/Charts/AttendanceChart";
import CountChart from "@/components/Charts/CountChart";
import FinanceChart from "@/components/Charts/FinanceChart";
import Annoucements from "@/components/Events/Annoucements";
import EventCalendar from "@/components/Events/EventCalendar";

const AdminPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 ">
      {/* RIGHT */}
      <div className="w-full flex flex-col lg:w-2/3 gap-8 ">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="students" />
          <UserCard type="teacher" />
          <UserCard type="staff" />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row ">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px] ">
            <CountChart boys="10" girls="12" />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* LEFT*/}
      <div className="w-full flex flex-col lg:w-1/3 gap-8">
      <EventCalendar/>
      <Annoucements/>
      </div>
    </div>
  );
};

export default AdminPage;
