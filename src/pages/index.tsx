import { FormEvent, useState } from "react";
import TuneCard from "~/components/tuneCard";

import { api } from "~/utils/api";

export default function Home() {
  const [name, setName] = useState("");
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const tunes = api.tunes.getAll.useQuery();
  const { mutate } = api.post.create.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ name: name });
    setName("");
  };

  return (
    <>
      <main className="bg-zinc-900 p-8 lg:p-12">
        <h1 className="flex justify-center font-mono text-3xl font-bold text-white">
          Your Collection
        </h1>
        <div className="flex">
          {tunes.data?.map((item) => {
            return <TuneCard {...item} />;
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-700 text-white"
          />
        </form>
      </main>
    </>
  );
}
