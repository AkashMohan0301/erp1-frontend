type Props = {
  message?: string;
};

export function FormError({ message }: Props) {
  if (!message) return null;

  return (
    <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
      {message}
    </div>
  );
}
