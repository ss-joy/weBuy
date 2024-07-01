//version 1.0.1
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { makeGetRequest } from "@/queries";
import { ApiResponse } from "@/types/apiResponse";
import { productSchemaType } from "@/types/products-type";

function SearchBox() {
  const [input, setInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  useEffect(() => {
    let waitInputValue = "";
    if (input) {
      waitInputValue = input;
    }
    const v = setTimeout(() => {
      setSearchValue(waitInputValue);
    }, 2000);

    return () => {
      clearTimeout(v);
    };
  }, [input]);

  const { data, isFetching } = useQuery<ApiResponse<productSchemaType[]>>({
    queryKey: ["search-for-product", searchValue],
    queryFn: () =>
      makeGetRequest(`/api/products/search?productName=${searchValue}`),
    enabled: !!(searchValue !== ""),
  });

  useEffect(() => {
    if (data?.data) {
      setShowSearchResults(true);
    }
  }, [data]);

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
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
              "animate-spin": isFetching,
            })}
          />
          <input
            className="w-full h-[40px] focus:outline-2 outline-slate-500 pl-3 pr-2"
            onChange={handleSearchInputChange}
            value={input}
            type="search"
            placeholder="search..."
          />
        </span>
        {data && showSearchResults ? (
          <ul
            className={cn(
              "absolute z-50 top-[60px] left-0 shadow-lg shadow-slate-400 rounded-md bg-white border-2 border-blue-300 w-full"
            )}
          >
            {data?.data?.map((e, index) => (
              <div key={e._id} className="w-full">
                <li
                  className={`shadow my-1 p-1 text-center w-full transition-all bg-white hover:bg-slate-300 text-slate-700 rounded hover:text-white hover:font-bold text-xl overflow-clip`}
                  onClick={() => setShowSearchResults(false)}
                >
                  <Link className="" href={`/products/${e._id}`}>
                    {e.name}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default SearchBox;
