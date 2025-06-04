import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

const PublicWebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicWebsiteLayout;
