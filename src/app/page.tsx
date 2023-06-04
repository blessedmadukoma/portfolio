import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen">
      <section className="items-center text-center max-w-[1280px] m-auto">
        {/* Header for the icons */}
        <Header />

        {/* Main content */}
        <Main />

        {/* Footer */}
        <Footer />
      </section>
    </main>
  );
}
