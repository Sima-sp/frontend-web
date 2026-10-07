// Fontes auto-hospedadas (pacotes @fontsource): funcionam offline e sem depender do Google Fonts no build.
import "@fontsource-variable/big-shoulders";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/atkinson-hyperlegible-mono";
import "./globals.css";
import { CONFIG } from "@/lib/config";

export const metadata = {
  title: "SIMA · O bueiro avisa antes que a rua alague",
  description:
    "Sistema Inteligente de Monitoramento de Alagamentos em São Paulo: a água medida nos bueiros, a chance de alagar nas próximas 3 horas e a rota de carro que desvia dos pontos em risco.",
  // O Next não acrescenta a subpasta de publicação ao ícone sozinho.
  icons: { icon: `${CONFIG.caminhoBase}/logo-bone.png` },
};

export const viewport = { themeColor: "#0f1113" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
