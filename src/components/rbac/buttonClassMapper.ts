export function mapButtonClass(buttonCode: string) {
  switch (buttonCode) {
    case "SAVE":
      return "font-semibold"
    case "DELETE":
      return "border border-red-500"
    default:
      return ""
  }
}
