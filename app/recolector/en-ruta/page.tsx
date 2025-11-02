"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, MapPin, Phone, Navigation, CheckCircle2, User } from "lucide-react"

export default function EnRutaPage() {
  const router = useRouter()
  const [completando, setCompletando] = useState(false)

  const recoleccion = {
    tipo: "Plástico PET",
    cantidad: "15 kg",
    pago: "$120",
    direccion: "Av. Reforma 123, Col. Centro, CDMX",
    usuario: "María González",
    telefono: "+52 55 1234 5678",
  }

  const handleCompletar = () => {
    setCompletando(true)
    setTimeout(() => {
      router.push("/recolector/completar")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold">En Ruta</span>
                <p className="text-xs text-primary-foreground/80">Recolección activa</p>
              </div>
            </div>
            <Badge className="bg-primary-foreground text-primary">Activa</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Mapa */}
        <Card className="p-0 mb-6 overflow-hidden">
          <div className="w-full h-64 bg-muted flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-primary mx-auto mb-3 animate-pulse" />
              <p className="text-lg font-semibold text-foreground">Navegando al destino</p>
              <p className="text-sm text-muted-foreground">1.2 km • 5 min</p>
            </div>
          </div>
          <div className="p-4 bg-card">
            <Button className="w-full bg-transparent" variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              Abrir Navegación
            </Button>
          </div>
        </Card>

        {/* Información de Destino */}
        <Card className="p-6 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Dirección de Recolección</h3>
              <p className="text-muted-foreground">{recoleccion.direccion}</p>
            </div>
          </div>
        </Card>

        {/* Información del Usuario */}
        <Card className="p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{recoleccion.usuario}</p>
                <p className="text-sm text-muted-foreground">{recoleccion.tipo}</p>
              </div>
            </div>
            <Button size="icon" variant="outline" asChild>
              <a href={`tel:${recoleccion.telefono}`}>
                <Phone className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Cantidad estimada</p>
              <p className="font-medium text-foreground">{recoleccion.cantidad}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pago estimado</p>
              <p className="text-xl font-bold text-primary">{recoleccion.pago}</p>
            </div>
          </div>
        </Card>

        {/* Instrucciones */}
        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Pasos a Seguir
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-semibold text-foreground">1.</span>
              <span>Llega a la dirección indicada</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-foreground">2.</span>
              <span>Contacta al usuario si es necesario</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-foreground">3.</span>
              <span>Recoge el material reciclable</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-foreground">4.</span>
              <span>Marca como completada cuando termines</span>
            </li>
          </ol>
        </Card>

        {/* Botón de Completar */}
        <Button size="lg" className="w-full" onClick={handleCompletar} disabled={completando}>
          <CheckCircle2 className="w-5 h-5 mr-2" />
          {completando ? "Completando..." : "Marcar como Completada"}
        </Button>
      </div>
    </div>
  )
}
