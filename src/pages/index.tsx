import Link from "next/link";
import LoadingSpinner from "~/components/loadingSpinner";
import TuneCard from "~/components/tuneCard";

import { api } from "~/utils/api";

export default function Home() {
  const { data, isLoading } = api.tunes.getAll.useQuery();

  return (
    <>
      <main className="min-h-screen bg-zinc-900 p-8 lg:p-12">
        <h1 className="mb-4 flex justify-center font-mono text-3xl font-bold text-white">
          Your Collection
        </h1>
        <Link
          href={"/addnew"}
          className=" absolute right-12 top-10 rounded-md bg-white px-2 py-1 outline-none"
        >
          Add New +
        </Link>
        {isLoading && (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {data?.map((item, index) => {
            return <TuneCard key={index} {...item} />;
          })}
        </div>
      </main>
    </>
  );
}
