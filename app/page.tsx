import Image from "next/image";
import CornerStyleSelectionPage from "./_components/CornerStyleSelectionPage";

const cornerTypesVarient = [
  {
    name: "Round",
    value: "round",
  },
  {
    name: "Scoop",
    value: "scoop",
  },
  {
    name: "Bevel",
    value: "bevel",
  },
  {
    name: "Notch",
    value: "notch",
  },
  {
    name: "Square",
    value: "square",
  },
  {
    name: "Squircle",
    value: "squircle",
  },
];

const TypeSelection = ({
  varient,
}: {
  varient: { name: string; value: string };
}) => {
  return (
    <div>
      <div className="w-42 h-42 border border-zinc-300 dark:border-neutral-700 rounded-lg"></div>
      <div className="text-sm font-medium">{varient.name}</div>
    </div>
  );
};

export default function Home() {
  return <CornerStyleSelectionPage />;
}
