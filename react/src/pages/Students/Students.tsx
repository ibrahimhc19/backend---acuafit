import { Estudiante } from "@/types"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import axios from 'axios'
import { useEffect, useState } from "react";



export default function StudentsPage() {

  const [tableData, setTableData] = useState<Estudiante[]>([]);
  const [firstPage, setFirstPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [lastPage, setLastPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [url, setUrl] = useState(
    `${import.meta.env.VITE_APP_API_URL}api/estudiantes`
  );

  const [indice, setIndice] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

//   const handlePageChange = (type: 'first' | 'previous' | 'next' | 'last') => {
//   switch (type) {
//     case 'first':
//       setUrl(firstPage);
//       break;
//     case 'previous':
//       setUrl(previousPage);
//       break;
//     case 'next':
//       setUrl(nextPage);
//       break;
//     case 'last':
//       setUrl(lastPage);
//       break;
//   }
// };

const func = (page:string) =>{
  return `https:${page.split(":")[1]}`
}
  const handlePageChange = (type: 'first' | 'previous' | 'next' | 'last') => {
  switch (type) {
    case 'first':
      setUrl(func(firstPage));
      break;
    case 'previous':
      setUrl(func(previousPage));
      break;
    case 'next':
      setUrl(func(nextPage));
      break;
    case 'last':
      setUrl(func(lastPage));
      break;
  }
};


useEffect(() => {
     axios
    //   .get("/mock/data.json")
      .get(url)
      .then((response) => {
        const apiResponse = response.data;
        if (
          apiResponse &&
          apiResponse.data &&
          Array.isArray(apiResponse.data)
        ) {
          setCurrentPage(apiResponse.current_page)
          setTableData(apiResponse.data);
          setIndice(apiResponse.from)
          setFirstPage(apiResponse.first_page_url);
          setPreviousPage(apiResponse.prev_page_url);
          setNextPage(apiResponse.next_page_url);
          setLastPage(apiResponse.last_page_url);
        } else {
          console.error(
            "La respuesta de la API no tiene el formato esperado:",
            apiResponse
          );
          setTableData([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setTableData([]);
      });
}, [url]);


  return (
    <div className="container mx-auto sm:px-6 py-4 lg:px-8 min-h-[75vh]">
      <DataTable<unknown, Estudiante>
      columns={columns(Number(indice))}
      data={tableData}
      nextPage={nextPage}
      previousPage={previousPage}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      />
    </div>
  )
}
