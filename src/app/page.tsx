import ChatBotLauncher from "./components/chatBotLauncher/chatBotLauncher";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">CleanSite</h1>
        <nav className="space-x-6 text-sm">
          <a href="#services" className="hover:underline">Serviços</a>
          <a href="#about" className="hover:underline">Sobre</a>
          <a href="#contact" className="hover:underline">Contato</a>
          <a href="/login" className="bg-white text-green-600 px-4 py-1 rounded-full font-semibold hover:bg-green-100">Entrar</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Deixe sua casa brilhando!
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-6">
          Serviços profissionais de limpeza residencial e comercial com confiança, qualidade e preço justo.
        </p>
        <a
          href="#contact"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg transition"
        >
          Solicitar Orçamento
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4">
        <p>&copy; 2025 CleanSite. Todos os direitos reservados.</p>
        <ChatBotLauncher/>
      </footer>
    </div>
  );
}

