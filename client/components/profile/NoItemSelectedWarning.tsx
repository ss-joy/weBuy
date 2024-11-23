import { AlertTriangleIcon } from "lucide-react";
import React from "react";

function NoItemSelectedWarning(): JSX.Element {
  return (
    <section
      id="status"
      className="flex items-center mt-8 mx-auto shadow-md shadow-black-200 p-6 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-[500px] sm:p-8 h-2/3 justify-start border-2 border-red-50 rounded-md text-red-500"
    >
      <AlertTriangleIcon className="mr-3" /> Please select at least one field to
      update
    </section>
  );
}

export default NoItemSelectedWarning;
