import Header from "@/components/Header";
import Footer from "@/components/Footer";

type ToolLayoutProps = {
  children: React.ReactNode;
};

export default function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}