import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"

interface PaymentStatusCardProps {
  estado: "pendiente" | "en-verificacion" | "aprobado" | "pagado" | "rechazado"
  monto: string
  descripcion?: string
}

export function PaymentStatusCard({ estado, monto, descripcion }: PaymentStatusCardProps) {
  const getEstadoConfig = () => {
    switch (estado) {
      case "pendiente":
        return {
          icon: <Clock className="w-6 h-6 text-muted-foreground" />,
          badge: <Badge variant="secondary">Pendiente</Badge>,
          color: "bg-muted/50",
          title: "Pago Pendiente",
        }
      case "en-verificacion":
        return {
          icon: <AlertCircle className="w-6 h-6 text-accent" />,
          badge: <Badge variant="secondary">En Verificación</Badge>,
          color: "bg-accent/5 border-accent/20",
          title: "En Verificación",
        }
      case "aprobado":
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
          badge: <Badge className="bg-primary text-primary-foreground">Aprobado</Badge>,
          color: "bg-primary/5 border-primary/20",
          title: "Pago Aprobado",
        }
      case "pagado":
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
          badge: <Badge className="bg-primary text-primary-foreground">Pagado</Badge>,
          color: "bg-primary/5 border-primary/20",
          title: "Pago Completado",
        }
      case "rechazado":
        return {
          icon: <XCircle className="w-6 h-6 text-destructive" />,
          badge: <Badge variant="destructive">Rechazado</Badge>,
          color: "bg-destructive/5 border-destructive/20",
          title: "Pago Rechazado",
        }
    }
  }

  const config = getEstadoConfig()

  return (
    <Card className={`p-6 ${config.color}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {config.icon}
          <div>
            <h3 className="font-semibold text-foreground">{config.title}</h3>
            <p className="text-3xl font-bold text-foreground mt-1">{monto}</p>
          </div>
        </div>
        {config.badge}
      </div>
      {descripcion && <p className="text-sm text-muted-foreground leading-relaxed">{descripcion}</p>}
    </Card>
  )
}
