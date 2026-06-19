import "./globals.css";

export const metadata = {
  title: "Gitfolio — GitHub to Portfolio in Seconds",
  description: "Turn your GitHub profile into a stunning developer portfolio. Enter your username, let AI craft your story, and share a polished portfolio link with recruiters.",
  keywords: "developer portfolio, GitHub portfolio, portfolio generator, dev portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
        {children}
      </body>
    </html>
  );
}
