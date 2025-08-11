const Annoucements = () => {
  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-semibold"> Annoucements</h1>
        <span className="text-xs text-gray-400">View all</span>
      </div>
      <div className="bg-lamaSkyLight rounded-md p-4 mt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Novidades sobre os próximos artigos</h2>
          <span className="text-xs text-gray-400 bg-white py-1 px-1">
            25/02/2025
          </span>
      </div>
        <p className="text-sm text-gray-400 mt-1">
          Este será um assunto muito debatido, sobre o que pode ser feito
        </p>
      </div>
      <div className="bg-lamaPurpleLight rounded-md p-4 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Novidades sobre os próximos artigos</h2>
          <span className="text-xs text-gray-400 bg-white py-1 px-1">
            26/02/2025
          </span>
      </div>
        <p className="text-sm text-gray-400 mt-1">
          Este será um assunto muito debatido, sobre o que pode ser feito
        </p>
      </div>
      <div className="bg-lamaYellowLight rounded-md p-4 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Novidades sobre os próximos artigos</h2>
          <span className="text-xs text-gray-400 bg-white py-1 px-1">
            27/05/2025
          </span>
      </div>
        <p className="text-sm text-gray-400 mt-1">
          Este será um assunto muito debatido, sobre o que pode ser feito
        </p>
      </div>
    </div>
  );
};

export default Annoucements;
