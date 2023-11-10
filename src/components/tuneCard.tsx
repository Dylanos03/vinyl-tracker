import type { tune } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

function TuneCard(props: tune) {
  const router = useRouter();
  const { mutate } = api.tunes.delete.useMutation();

  const handleDelete = () => {
    mutate({ id: props.id });
    router.refresh();
  };
  return (
    <div className="relative rounded-md bg-zinc-700 p-4 text-white">
      <h2 className="text-2xl">{props.id}</h2>
      <h3 className="text-3xl font-bold">
        {props.tuneName} -{" "}
        <span className="font-normal">{props.tuneArtist}</span>
      </h3>
      <h3>Genre: {props.genre}</h3>
      <div className="flex justify-between">
        <h3>BPM: {props.bpm}</h3>
        <h3>Key: {props.tuneKey}</h3>
      </div>
      <button
        className="absolute right-4 top-2 text-3xl"
        onClick={handleDelete}
      >
        -
      </button>
    </div>
  );
}

export default TuneCard;
