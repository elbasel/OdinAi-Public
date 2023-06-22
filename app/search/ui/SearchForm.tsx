"use client";

import { Input } from "@app/ui/Input";
import { requestSearchResults } from "../actions/requestSearchResulsts";
import { buttonStyles } from "@app/ui/styles/button";
import { useState, useTransition } from "react";
import { RiLoader3Fill } from "react-icons/ri";
import { MdOutlineLocationSearching } from "react-icons/md";
import { requestDeepDive } from "../actions/requestDeepDive";
import { TbReload } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { MdOutlineClear } from "react-icons/md";

export const SearchForm = ({
  userId = "",
  deepDiveUrl = "",
  deepDiveEnabled = false,
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDivingDeeper, startDiving] = useTransition();
  const [clearButtonEnabled, setClearButtonEnabled] = useState(false);

  console.log("deepDiveUrl", deepDiveUrl);
  return (
    <form
      action={(formData) => {
        const userSearchQuery = formData.get("searchQueryInput")?.toString();
        if (!userSearchQuery || userSearchQuery == null)
          return toast.error("Did you forget something? :)");
        localStorage.setItem("searchQuery", userSearchQuery);
        startTransition(() => {
          requestSearchResults(userSearchQuery, userId);
        });
      }}
      className="flex mt-auto border border-current rounded-lg text-inherit"
    >
      <Input
        onchange={(e) => {
          if (e.target.value.length > 0) {
            setClearButtonEnabled(true);
          } else {
            setClearButtonEnabled(false);
          }
        }}
        name="searchQueryInput"
        placeholder={
          isPending
            ? "Searching the internet for you..."
            : "Search for anything"
        }
        defaultValue=""
        keyString="searchQueryInput"
        className="py-2 searchQueryInput md:text-xl"
      />
      {clearButtonEnabled && (
        <button
          onClick={() => {
            const inputElem = document.querySelector(
              ".searchQueryInput"
            ) as HTMLInputElement;
            if (!inputElem) return;
            inputElem.value = "";
            setClearButtonEnabled(false);
          }}
          className={buttonStyles}
          type="button"
        >
          <MdOutlineClear size={32} className="w-6 h-6 md:h-8 md:w-8" />
        </button>
      )}
      {!isDivingDeeper && (
        <button
          disabled={isPending || isDivingDeeper}
          className={buttonStyles}
          type="submit"
        >
          {isPending && (
            <RiLoader3Fill
              size={32}
              className="w-6 h-6 duration-1000 md:h-8 md:w-8 animate-spin"
            />
          )}
          {!isPending && (
            <MdOutlineLocationSearching
              className="w-6 h-6 md:h-8 md:w-8"
              size={32}
            />
          )}
        </button>
      )}

      {/* {!isPending && deepDiveUrl != "" && deepDiveEnabled && (
        <button
          className={twMerge(buttonStyles)}
          disabled={isDivingDeeper || isPending}
          formAction={(formData: FormData) => {
            const searchQuery = formData.get("searchQueryInput")?.toString();
            if (!searchQuery || searchQuery == null)
              return toast.error("Type something to search");
            const savedSearchQuery = localStorage.getItem("searchQuery");
            if (savedSearchQuery !== searchQuery)
              return toast("Initiate a search first");
            startDiving(() =>
              requestDeepDive(userId, savedSearchQuery, deepDiveUrl)
            );
          }}
        >
          {isDivingDeeper && (
            <RiLoader3Fill
              size={32}
              className="w-6 h-6 duration-1000 md:h-8 md:w-8 animate-spin"
            />
          )}
          {!isDivingDeeper && (
            <TbReload className="w-6 h-6 md:h-8 md:w-8" size={32} />
          )}
        </button>
      )} */}
    </form>
  );
};

export default SearchForm;
