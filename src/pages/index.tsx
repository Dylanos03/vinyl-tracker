import Link from "next/link";
import { useState } from "react";

import LoadingSpinner from "~/components/loadingSpinner";
import TuneCard from "~/components/tuneCard";

import { api } from "~/utils/api";

export default function Home() {
  // const { data, isLoading } = api.tunes.getAll.useQuery();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const tunes = api.tunes.getSome.useQuery(search);
  var distinctGenres = [...new Set(tunes.data?.map((i) => i.genre))];

  return (
    <>
      <main className="min-h-screen bg-zinc-900 p-8 lg:p-12">
        <h1 className="mb-4 flex justify-center font-mono text-3xl font-bold text-white">
          Your Collection
        </h1>
        <div className="flex justify-center">
          <div className="flex max-w-min items-center justify-center gap-2 rounded-lg bg-white">
            <input
              placeholder="Search"
              className="rounded-md px-4 py-2"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <span className="h-6 w-0.5 rounded-sm bg-zinc-100"></span>
            <select
              name=""
              id=""
              className="rounded-lg text-zinc-700"
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" selected>
                Select
              </option>
              {distinctGenres.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
        </div>

        <Link
          href={"/addnew"}
          className=" absolute right-12 top-10 rounded-md bg-white px-2 py-1 outline-none"
        >
          Add New +
        </Link>
        {tunes.isLoading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4 py-8">
          {tunes.data?.map((item, index) => {
            if (genre === "") {
              return <TuneCard key={index} {...item} />;
            }
            if (item.genre == genre) {
              return <TuneCard key={index} {...item} />;
            }
          })}
        </div>
      </main>
    </>
  );
}
