import { IoSearch } from "react-icons/io5";

function AssistanteTable(){
    return(
        <>
         <h2 className="text-2xl font-bold  my-6 flex justify-center items-center">Table Assistante pour gerer les documment</h2>

         <div className="App flex justify-center items-center mt-40 ">
         <div className="flex flex-col items-center w-full mx-40">

         <div className=" flex mx-0 w-full items-center ">
            <div className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 h-8 w-8  mt-1">
                <IoSearch />
              </span>
              <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-[400px] border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm" 
              placeholder="Entrer le nom de stagiaire" type="text" name="search"/>
            </div>

            <div className="flex w-full justify-end ">
                <input id="draft" className="peer/validée" type="radio" name="status" checked />
                <label for="draft" className="peer-checked/validée:text-green-500 mx-2">validée</label>

                <input id="published" className="peer/attente ml-7" type="radio" name="status" />
                <label for="published" className="peer-checked/attente:text-orange-500 mx-2">en attente</label>
            </div>

         </div>

         <div className="overflow-x-auto mt-10 w-full">

        <table className="bg-white border border-gray-200 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-sm">Nom et Prenom</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Type de Documment</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">état</th>
              <th className="text-left py-3 px-1 font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t py-3 px-4">John Doe</td>
              <td className="border-t py-3 px-4">Contrat</td>
              <td className="border-t py-3 px-4 text-green-700">validée</td>
              <td className="border-t py-3 px-1">
                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Imprimer</button>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border-t py-3 px-4">Jane Smith</td>
              <td className="border-t py-3 px-4">Demande de stage</td>
              <td className="border-t py-3 px-4 text-green-600">validée</td>
              <td className="border-t py-3 px-1">
                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Imprimer</button>
              </td>
            </tr>
            <tr>
              <td className="border-t py-3 px-4">Mike Johnson</td>
              <td className="border-t py-3 px-4">Attestation d'inscription</td>
              <td className="border-t py-3 px-4 text-orange-600">en attente </td>
              <td className="border-t py-3 px-1">
                <button  className="bg-gray-500 hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">Imprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      </div>
        
        </>
    )
}
export default AssistanteTable;