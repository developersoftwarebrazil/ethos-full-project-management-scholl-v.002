"use client";
import Image from "next/image";
import { useState } from "react";
import { Calendar } from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const events = [
    {
      id: "1",
      title: "Aula de Ética",
      time: "25/02/2025 09:00 pm",
      description: "Revisão des aulas sobre ética e paciêntes",
    },
     {
      id: "2",
      title: "Aula de Psicánalise",
      time: "25/01/2025 10:00 pm",
      description: "Revisão das aulas vista até o momento",
    },
     {
      id: "3",
      title: "Aula de Psicanálise",
      time: "25/02/2025 10:00 pm",
      description: "Revisão de sobre igmund Freud",
    },
     
  ];
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple" key={event.id}>
            <div className="flex items-center justify-between">
              <h1 className="text-gray-600 font-semibold">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
