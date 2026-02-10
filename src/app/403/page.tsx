export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-600">403</h1>
        <p className="text-lg text-muted-foreground">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}
