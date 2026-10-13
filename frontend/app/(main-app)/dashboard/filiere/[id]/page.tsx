"use client"
import { getOneFiliere } from "@/lib/filiereServerActions";
import FiliereModuleTable from "@/components/Table/FiliereModuleTable";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllFiliereByModule } from "@/lib/filiereModuleServerActions";
import { Loader } from "@/components/Loader";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormFiliereModule from "@/components/Form/FormFiliereModule";

const Page = () => {
  const {id} = useParams()


  const { data, isSuccess } = useQuery({
    queryKey: ["filiere", id],
    queryFn:()=>getOneFiliere(id)
  });

  const { data: modules, isSuccess:moduleSuccess } = useQuery({
    queryKey: ["filiere_modules", id],
    queryFn:()=>getAllFiliereByModule(id)
  });

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [data, isSuccess]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterFiliere = data.data?.filter((filiere) =>
      filiere.nom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterFiliere });
  };
  
  if(!isSuccess){
    return <Loader />
  }
  
  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-2xl uppercase text-zinc-800">
          Module de la filière <span className="text-yellow-400">{data.nom}</span>
        </h1>
        <CreateModalContext titre={"Associer un module à la filière "+data.nom}>
          <FormFiliereModule data={{id_filiere:data.id}} />
        </CreateModalContext>
      </div>
      <div className=" bg-white rounded shadow">
        {
            !moduleSuccess ? <Loader />:
            <FiliereModuleTable id_filiere={data.id} data={modules} />  
        }
      </div>
    </div>
  );
};

export default Page;
