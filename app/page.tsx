import Image from "next/image";
import CornerStyleSelectionPage from "./_components/CornerStyleSelectionPage";

export default function Home() {
  return (
    <>
      <CornerStyleSelectionPage />
      <div className="py-24 flex items-center justify-center text-xs bg-linear-to-b from-white dark:from-black to-zinc-200 dark:to-zinc-900">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://madebyenigma.com"
            target="_blank"
            className="text-blue-800 dark:text-blue-100 hover:text-blue-100"
            rel="noopener noreferrer"
          >
            Enigma
          </a>
        </p>
      </div>
    </>
  );
}
