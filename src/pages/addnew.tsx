import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/utils/api";

function AddNew() {
  const router = useRouter();
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [bpm, setBpm] = useState(0);
  const [songKey, setSongKey] = useState("");

  const { mutate } = api.tunes.create.useMutation();

  const handleSubmit = () => {
    mutate({
      tuneName: songName,
      tuneArtist: artist,
      genre: songGenre,
      bpm: bpm,
      tuneKey: songKey,
    });

    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-900 p-12 text-white">
      <h1 className="flex justify-center text-3xl font-bold ">Add New</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label>Song Name</label>
          <input
            className="text-zinc-900"
            type="text"
            value={songName}
            onChange={(e) => {
              setSongName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label>Song Artist</label>
          <input
            className="text-zinc-900"
            type="text"
            value={artist}
            onChange={(e) => {
              setArtist(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label>Genre</label>
          <input
            className="text-zinc-900"
            type="text"
            value={songGenre}
            onChange={(e) => {
              setSongGenre(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label>BPM</label>
          <input
            className="text-zinc-900"
            type="number"
            value={bpm}
            onChange={(e) => {
              setBpm(Number(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col">
          <label>Key</label>
          <input
            className="text-zinc-900"
            type="text"
            value={songKey}
            onChange={(e) => {
              setSongKey(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </div>
    </main>
  );
}

export default AddNew;
