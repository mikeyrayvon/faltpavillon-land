import Link from "next/link";
import { FC } from "react";

const ExitPreview: FC = () => (
  <Link
    href="/api/exit-preview"
    className="fixed bottom-0 left-0 w-full text-center bg-red-500 text-white p-2"
  >
    Exit Preview Mode
  </Link>
);

export default ExitPreview;
