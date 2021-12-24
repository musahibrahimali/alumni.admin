import React from "react";
const PageChange = (props) => {
  const path = props.path.split("/");
  const pathName = path[path.length - 1];
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-frosty-schene bg-cover bg-no-repeat h-screen">
        <div className="w-[600px] top-0 h-4 rounded shim-blue">
        </div>
        <h4 className="bg-gray-100 mt-4 px-8 bg-opacity-40 text-error-bg font-sans cursor-default font-bold text-lg md:text-2xl py-2">
          Loading {pathName.toString()} page
        </h4>
      </div>
    </div>
  );
}

export default PageChange;
