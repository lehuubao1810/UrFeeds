import { useState } from "react";
import { notify } from "../utils/toast";

export default function ImportFile() {
  const [file, setFile] = useState<File | null>(null);

  const handleImport = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Importing file", file);
    notify("Import file function is developing", "info");
  };

  return (
    <div className="sm:w-4/5 ">
      <div className="p-6 bg-gray-100 rounded-lg mb-6">
      <h1 className="font-bold mb-4">Import file from your device</h1>

        <div className="w-full h-full border-2 rounded-lg relative py-5 mr-4 border-gray-400">
          <input
            aria-label="file"
            type="file"
            // limit file type to .xls and .xlsx
            accept=".xls,.xlsx"
            className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer z-10"
            onChange={(e) => {
              if (
                e.target.files![0].type === "application/vnd.ms-excel" ||
                e.target.files![0].type ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ) {
                console.log(e.target.files![0]);
                setFile(e.target.files![0]);
              } else {
                notify("Invalid file format", "error");
              }
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-6 h-6 text-yellow-600  mx-auto "
            >
              <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />{" "}
            </svg>
            <p className="font-semibold">Upload your file</p>
          </div>
        </div>
        <p className="font-semibold text-sm mt-2 mb-4">
          (support .xls and .xlsx file format)
        </p>

        {file !== null && (
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                className="w-16 h-16 text-green-700  mb-2"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z" />
              </svg>
              <p className="font-semibold mb-4">
                {file?.name ?? "No file selected"}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="text-white rounded-lg px-4 py-1 bg-slate-500 mr-4"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white rounded-lg px-4 py-1"
                onClick={(e) => handleImport(e)}
              >
                Import
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
