//version 1.0.1
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
  sellerName: string;
  sellerId: string;
  sellCount: number;
}

function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Product[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const searchResultsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const qdata = await axios.get(
          `/api/products/search?productName=${searchValue}`
        );
        setData(qdata?.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setData([]);
        console.error("Error fetching data:", error);
      }
    }

    const clearPrevCall = setTimeout(() => {
      getProducts();
    }, 500);

    return () => {
      clearTimeout(clearPrevCall);
    };
  }, [searchValue]);

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    setSelectedItemIndex(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (data && data.length > 0 && searchResultsRef.current) {
      const numResults = data.length;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex((prevIndex) =>
          prevIndex === null ? 0 : (prevIndex + 1) % numResults
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex((prevIndex) =>
          prevIndex === null
            ? numResults - 1
            : (prevIndex - 1 + numResults) % numResults
        );
      } else if (e.key === "Enter" && selectedItemIndex !== null) {
      }
    }
  }

  return (
    <>
      <div
        id="searchbox-container"
        className="relative w-[150px] md:w-[350px] lg:w-[450px]"
      >
        <span className="flex items-center lg:text-3xl w-full">
          <SearchIcon
            className={cn("text-slate-500 mr-2 h-[40px]", {
              "animate-spin": isLoading,
            })}
          />
          <input
            className="w-full h-[40px] focus:outline-2 outline-slate-500 pl-3 pr-2"
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            value={searchValue}
            type="search"
            placeholder="search..."
            aria-autocomplete="list"
            aria-expanded={data.length > 0}
            aria-owns="search-results"
          />
        </span>

        <ul
          id="search-results"
          ref={searchResultsRef}
          className={cn(
            "absolute z-50 top-[60px] left-[-60px] shadow-lg shadow-slate-400 rounded-md bg-white border-2 border-blue-300 w-[300px] md:w-full",
            {
              hidden: data.length === 0,
            }
          )}
          role="listbox"
        >
          {data?.map((e, index) => (
            <div key={e._id} className="w-full">
              <li
                className={`shadow my-1 p-1 text-center w-full transition-all bg-white hover:bg-slate-300 text-slate-700 rounded hover:text-white hover:font-bold text-xl overflow-clip ${
                  index === selectedItemIndex ? "bg-gray-200" : ""
                }`}
                role="option"
                tabIndex={0}
              >
                <Link
                  className=""
                  onClick={() => {
                    setData([]);
                  }}
                  href={`/products/${e._id}`}
                >
                  {e.name}
                </Link>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchBox;

// version 1.0.0
// import { SearchIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   imagePath: string;
//   sellerName: string;
//   sellerId: string;
//   sellCount: number;
// }

// function SearchBox() {
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [data, setData] = useState<Product[]>([]);

//   useEffect(() => {
//     async function getProducts() {
//       try {
//         setIsLoading(true);
//         const qdata = await axios.get(
//           `http://localhost:3000/api/products/search?productName=${searchValue}`
//         );
//         setData(qdata?.data.data);
//         setIsLoading(false);
//       } catch (error) {
//         setIsLoading(false);
//         setData([]);
//         console.log(error);
//       }
//     }

//     const clearPrevCall = setTimeout(() => {
//       getProducts();
//     }, 500);

//     return () => {
//       clearTimeout(clearPrevCall);
//     };
//   }, [searchValue]);

//   function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setSearchValue(e.target.value);
//   }
//   return (
//     <>
//       <div
//         id="searchbox-container"
//         className="relative w-[10px] md:w-[350px] lg:w-[450px]"
//       >
//         <span className="flex items-center lg:text-3xl w-full">
//           <SearchIcon
//             className={cn("text-slate-500 mr-2 h-[40px]", {
//               "animate-spin": isLoading,
//             })}
//           />
//           <input
//             className="w-full h-[40px] focus:outline-2 outline-slate-500 pl-3"
//             onChange={handleSearchInputChange}
//             value={searchValue}
//             type="search"
//             placeholder="search..."
//           />
//         </span>

//         <ul
//           className={cn(
//             "absolute top-[60px] left-[-60px] shadow-lg shadow-slate-400 rounded-md bg-white border-2 border-blue-300 w-[300px] md:w-full",
//             {
//               hidden: data.length === 0,
//             }
//           )}
//         >
//           {data?.map((e) => {
//             return (
//               <div key={e._id} className="w-full">
//                 <li className="shadow my-1 p-1 text-center w-full transition-all bg-white hover:bg-slate-300 text-slate-700 rounded hover:text-white hover:font-bold text-xl overflow-clip">
//                   {
//                     <Link className="" href={`/products/search/${e._id}`}>
//                       {e.name}
//                     </Link>
//                   }
//                 </li>
//               </div>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default SearchBox;
