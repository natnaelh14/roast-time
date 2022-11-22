import React from 'react';

export const ImageInput = () => {
  return (
    <div className="relative mt-5 space-y-1 pt-7">
      <input
        id='"restaurant_image"'
        required={true}
        className="mb-5 block w-full cursor-pointer rounded-lg border border-slate-300 bg-gray-50 text-xs text-gray-900 focus:outline-none dark:border-gray-secondary  dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        type="file"
      ></input>
      <label
        className={
          "absolute -top-0.5 left-0.5 select-none text-xs font-medium text-neutral-500 transition-all  ease-out peer-placeholder-shown:pointer-events-none peer-placeholder-shown:text-xs peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-sm dark:text-neutral-300 md:text-sm md:peer-placeholder-shown:text-base"
        }
        htmlFor="restaurant_image"
      >
        Restaurant Image
      </label>
    </div>
  );
};
