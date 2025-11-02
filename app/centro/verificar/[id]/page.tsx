"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Recycle, ArrowLeft, Package, Scale, DollarSign, User, Truck, CheckCircle2, XCircle } from "lucide-react"

export default function VerificarMaterialPage() {
  const router = useRouter()
  const [procesando, setProcesando] = useState(false)
  const [pesoVerificado, setPesoVerificado] = useState("")
  const [calidad, setCalidad] = useState("buena")
  const [notas, setNotas] = useState("")

  const solicitud = {
    id: 1,
    tipo: "Plástico PET",
    cantidadEstimada: "15 kg",
    pesoReal: "14.5 kg",
    recolector: "Carlos Méndez",
    origen: "Usuario",
    nombreOrigen: "María González",
    precioPorKg: 8,
  }

  const calcularPago = () => {
    if (!pesoVerificado) return 0
    let precio = Number.parseFloat(pesoVerificado) * solicitud.precioPorKg

    // Ajuste por calidad
    if (calidad === "excelente") precio *= 1.1
    if (calidad === "regular") precio *= 0.9
    if (calidad === "mala") precio *= 0.7

    return precio
  }

  const handleAprobar = () => {
    setProcesando(true)
    setTimeout(() => {
      router.push("/centro/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/centro/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Recycle className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Verificar Material</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Información del Material */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{solicitud.tipo}</h3>
              <p className="text-sm text-muted-foreground">Material recibido</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Cantidad estimada</p>
              <p className="font-medium text-foreground">{solicitud.cantidadEstimada}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Peso reportado</p>
              <p className="font-medium text-foreground">{solicitud.pesoReal}</p>
            </div>
          </div>
        </Card>

        {/* Información de Origen */}
        <Card className="p-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="text-sm">Origen</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{solicitud.nombreOrigen}</p>
                <p className="text-xs text-muted-foreground">{solicitud.origen}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span className="text-sm">Recolector</span>
              </div>
              <p className="font-medium text-foreground">{solicitud.recolector}</p>
            </div>
          </div>
        </Card>

        {/* Formulario de Verificación */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            Verificación de Peso y Calidad
          </h3>

          <div className="space-y-6">
            {/* Peso Verificado */}
            <div className="space-y-2">
              <Label htmlFor="peso">Peso Verificado (kg)</Label>
              <Input
                id="peso"
                type="number"
                step="0.1"
                placeholder="14.5"
                value={pesoVerificado}
                onChange={(e) => setPesoVerificado(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Peso real después de verificación en báscula</p>
            </div>

            {/* Calidad del Material */}
            <div className="space-y-3">
              <Label>Calidad del Material</Label>
              <RadioGroup value={calidad} onValueChange={setCalidad}>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="excelente" id="excelente" />
                  <Label htmlFor="excelente" className="cursor-pointer flex-1">
                    <div className="font-medium">Excelente</div>
                    <div className="text-xs text-muted-foreground">Material limpio y bien separado (+10%)</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="buena" id="buena" />
                  <Label htmlFor="buena" className="cursor-pointer flex-1">
                    <div className="font-medium">Buena</div>
                    <div className="text-xs text-muted-foreground">Material en buen estado (precio normal)</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="cursor-pointer flex-1">
                    <div className="font-medium">Regular</div>
                    <div className="text-xs text-muted-foreground">Material con impurezas (-10%)</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="mala" id="mala" />
                  <Label htmlFor="mala" className="cursor-pointer flex-1">
                    <div className="font-medium">Mala</div>
                    <div className="text-xs text-muted-foreground">Material contaminado (-30%)</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notas */}
            <div className="space-y-2">
              <Label htmlFor="notas">Notas de Verificación (Opcional)</Label>
              <Textarea
                id="notas"
                placeholder="Observaciones sobre el material recibido..."
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Cálculo de Pago */}
        {pesoVerificado && (
          <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Pago Total</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {pesoVerificado} kg × ${solicitud.precioPorKg}/kg
                  {calidad === "excelente" && " (+10%)"}
                  {calidad === "regular" && " (-10%)"}
                  {calidad === "mala" && " (-30%)"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-accent">${calcularPago().toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-card rounded-lg">
                <p className="text-muted-foreground mb-1">Para Usuario</p>
                <p className="font-semibold text-foreground">${(calcularPago() * 0.7).toFixed(2)}</p>
              </div>
              <div className="p-3 bg-card rounded-lg">
                <p className="text-muted-foreground mb-1">Para Recolector</p>
                <p className="font-semibold text-foreground">${(calcularPago() * 0.3).toFixed(2)}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Información de Pago */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Proceso de Pago</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Al aprobar esta verificación, se procesará el pago automáticamente. El 70% se enviará al usuario/empresa
                y el 30% al recolector. Los fondos se liberarán en 24-48 horas.
              </p>
            </div>
          </div>
        </Card>

        {/* Botones de Acción */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Rechazar
          </Button>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground"
            onClick={handleAprobar}
            disabled={!pesoVerificado || procesando}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {procesando ? "Procesando..." : "Aprobar y Pagar"}
          </Button>
        </div>
      </div>
    </div>
  )
}
