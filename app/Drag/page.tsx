"use client";
import { BlobServiceClient } from "@azure/storage-blob";
import { useRef, useState, useEffect } from "react";
export default function DragAndDrop() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  function handleSubmitFile(e: any) {
    console.log("Files submitted:", files);

    for(let i = 0; i < files.length; i++) {
      let file = files[i];
      let blob = new Blob([file], { type: file.type });
      uploadBlob(blob, file.name).catch(console.error);
    }
    alert("fichier(s) ajouté(s)");
  }
  async function uploadBlob(blobData: Blob, name: string): Promise<void> {
    const storageUrl = process.env.NEXT_PUBLIC_URL_SAP;
    console.log("Storage URL:", storageUrl)
    if (!storageUrl) {
      console.log("Storage URL not found");
      throw new Error("Storage URL not found");
    }
    const blobServiceClient = new BlobServiceClient(storageUrl);
    const containerClient = blobServiceClient.getContainerClient("architecte");
    const blobClient = containerClient.getBlockBlobClient(name);
    const result = await blobClient.uploadData(blobData);

  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div id="drag" className="flex items-center justify-center">
      <form
        className={`${
          dragActive ? "drag-active-class" : "drag-inactive-class"
        }  p-4 w-1/3 rounded-lg border border-black min-h-[8rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
       <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
          accept=".hdr,.glb,.gltf"
        />

        <p>
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                remove
              </span>
            </div>
          ))}
        </div>
        {files.length>0 && <button
          className="bg-black rounded-lg p-2 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Submit</span>
        </button>}
      </form>
    </div>
  );
}