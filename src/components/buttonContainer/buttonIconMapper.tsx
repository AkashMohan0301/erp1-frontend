import {
  Save,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
} from "lucide-react"

export function mapIcon(buttonCode: string) {
  switch (buttonCode) {
    case "SAVE":
      return <Save className="h-4 w-4" />
    case "EDIT":
      return <Pencil className="h-4 w-4" />
    case "DELETE":
      return <Trash2 className="h-4 w-4" />
    case "APPROVE":
      return <CheckCircle className="h-4 w-4" />
    case "REJECT":
      return <XCircle className="h-4 w-4" />
    default:
      return null
  }
}
