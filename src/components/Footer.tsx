export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NextBlogger
      </div>
    </footer>
  );
}
