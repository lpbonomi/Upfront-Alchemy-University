import { type ReactElement } from "react";
import Navbar from "../components/navigation/navbar";

export default function MainLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
