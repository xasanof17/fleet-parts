import React from "react"
export const metadata = {
  title: "Fleet Parts Studio",
  description: "Manage fleet parts inventory",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
