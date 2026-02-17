export function mapButtonClass(buttonCode: string) {
  switch (buttonCode) {
    case "ACCESS":
      return "hidden" // special case: hide ACCESS buttons in UI  
    case "SAVE":
      return "bg-blue-400 hover:bg-blue-200"
    case "VIEW":
      return "bg-blue-200 hover:bg-blue-300"
    case "NEW":
      return "bg-green-400 hover:bg-green-200"
    case "DELETE":
      return " border-red-500"
    default:
      return ""
  }
}
