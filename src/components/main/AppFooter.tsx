export default function Footer() {
  return (
    <footer className="h-12 border-t  flex items-center justify-between px-4 text-xs ">
      <span><p>© {new Date().getFullYear()} | Pravaha Softwares Private LTD.</p></span>
      <span>v1.0.0</span>
    </footer>
  );
}
