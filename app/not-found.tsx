export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Return Home
      </a>
    </div>
  )
}
