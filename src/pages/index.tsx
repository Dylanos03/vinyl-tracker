import Link from "next/link";
import TuneCard from "~/components/tuneCard";

import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.tunes.getAll.useQuery();

  return (
    <>
      <main className="min-h-screen bg-zinc-900 p-8 lg:p-12">
        <h1 className="mb-4 flex justify-center font-mono text-3xl font-bold text-white">
          Your Collection
        </h1>
        <Link
          href={"/addnew"}
          className=" absolute right-12 top-12 bg-white px-2 py-1"
        >
          Add New +
        </Link>
        <div className="flex flex-wrap gap-4">
          {data?.map((item, index) => {
            return <TuneCard key={index} {...item} />;
          })}
        </div>
      </main>
    </>
  );
}
