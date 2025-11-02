"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Recycle, Package, Scale, DollarSign, Building2 } from "lucide-react"

export default function CompletarRecoleccionPage() {
  const router = useRouter()
  const [enviando, setEnviando] = useState(false)
  const [pesoReal, setPesoReal] = useState("")

  const recoleccion = {
    tipo: "Plástico PET",
    cantidadEstimada: "15 kg",
    pagoEstimado: "$120",
    precioPorKg: 8,
  }

  const calcularPago = () => {
    if (!pesoReal) return 0
    return Number.parseFloat(pesoReal) * recoleccion.precioPorKg
  }

  const handleEnviar = () => {
    setEnviando(true)
    setTimeout(() => {
      router.push("/recolector/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">Completar Recolección</span>
              <p className="text-xs text-muted-foreground">Envía al centro de reciclaje</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Información del Material */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{recoleccion.tipo}</h3>
              <p className="text-sm text-muted-foreground">Material recolectado</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Cantidad estimada</p>
              <p className="font-medium text-foreground">{recoleccion.cantidadEstimada}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pago estimado</p>
              <p className="font-medium text-primary">{recoleccion.pagoEstimado}</p>
            </div>
          </div>
        </Card>

        {/* Formulario de Peso Real */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Peso Real del Material
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso en kilogramos</Label>
              <Input
                id="peso"
                type="number"
                step="0.1"
                placeholder="15.0"
                value={pesoReal}
                onChange={(e) => setPesoReal(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Este peso será verificado por el centro de reciclaje</p>
            </div>

            {pesoReal && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pago calculado</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pesoReal} kg × ${recoleccion.precioPorKg}/kg
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-primary">${calcularPago().toFixed(2)}</p>
                </div>
              </Card>
            )}
          </div>
        </Card>

        {/* Centro de Reciclaje */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Centro de Reciclaje Destino
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Centro</span>
              <span className="font-medium text-foreground">EcoCenter CDMX</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Distancia</span>
              <span className="font-medium text-foreground">3.5 km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Horario</span>
              <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Ver Ubicación en Mapa
          </Button>
        </Card>

        {/* Información de Pago */}
        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-accent mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Proceso de Pago</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Entrega el material al centro de reciclaje</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>El centro verificará el peso y calidad</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Una vez aprobado, recibirás el pago automáticamente</span>
                </li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Botón de Enviar */}
        <Button size="lg" className="w-full" onClick={handleEnviar} disabled={!pesoReal || enviando}>
          {enviando ? "Enviando al centro..." : "Enviar al Centro de Reciclaje"}
        </Button>
      </div>
    </div>
  )
}
