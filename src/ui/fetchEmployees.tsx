import { useState } from "react";

type Employee = {
  id: string;
  name: string;
  description: string;
};

export const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [load, setLoad] = useState(false);
  const [button, setButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setLoad(true) // loading jalan
      setButton(true)
      const request = (await fetch("http://localhost:2000/employees", {
        method: "GET",
      }).then((r) => r.json())) as Employee[];
      setEmployees(request);
    } catch (err) {
      alert(err);
    } finally {
      setLoad(false); // loading selesai
      setButton(false);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-20">Fetch Employees</h1>
      <div className="flex flex-col items-center">
        <button
          disabled={load}
          onClick={fetchEmployees}
          className="text-center items-center w-fit duration-500 text-white bg-gray-800 hover:bg-gray-400 hover:text-black p-3 rounded-md"
        >
          {button? 'Loading...' : 'Employees'}
        </button>
        {load && <p>Loading...</p>}
        <div className="flex flex-wrap gap-3 justify-center m-6">
          {loading?
           <p className="text-center items-center">Loading...</p> : employees.map((data) => {
            return (
              <>
                <div
                  id={data.id}
                  className="w-36 bg-gray-700 p-4 rounded-md duration-300 hover:bg-gray-300 hover:text-black"
                >
                  <p>
                    <b>Nama : </b>
                    {data.name}
                  </p>
                  <p>
                    <b>Description : </b>
                    {data.description}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
