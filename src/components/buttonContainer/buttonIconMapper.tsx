import {
  Save,
  Trash2,
  Pencil,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
} from "lucide-react"

export function mapIcon(buttonCode: string) {
  switch (buttonCode) {
    case "SAVE":
      return <Save className="h-4 w-4" />
    case "VIEW":
      return <Eye className="h-4 w-4" />
    case "EDIT":
      return <Pencil className="h-4 w-4" />
    case "DELETE":
      return <Trash2 className="h-4 w-4" />
    case "NEW":
      return <Plus className="h-4 w-4" />
    default:
      return null
  }
}
