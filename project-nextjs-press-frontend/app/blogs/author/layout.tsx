import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      Author Layout
      {children}
    </section>
  );
}
