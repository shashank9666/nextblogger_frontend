export default function Footer() {
  return (
    <footer 
      className="border-t py-4"
      style={{ 
        backgroundColor: 'var(--color-bg-primary)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p 
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          © 2025 NextBlogger. Built with Next.js
        </p>
      </div>
    </footer>
  );
}
