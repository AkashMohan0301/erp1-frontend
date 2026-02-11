export function mapButtonClass(buttonCode: string) {
  switch (buttonCode) {
    case "ACCESS":
      return "hidden" // special case: hide ACCESS buttons in UI  
    case "SAVE":
      return "font-semibold"
    case "DELETE":
      return "border border-red-500"
    default:
      return "border border-blue-500"
  }
}
