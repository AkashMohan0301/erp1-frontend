type Props = {
  errors?: string[];
};

export function FieldError({ errors }: Props) {
  if (!errors || errors.length === 0) return null;

  return (
    <p className="mt-1 text-xs text-red-600">
      {errors[0]}
    </p>
  );
}
