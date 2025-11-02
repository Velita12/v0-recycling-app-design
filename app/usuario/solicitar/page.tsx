"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Recycle, ArrowLeft, Package, Calendar, MapPin, ImageIcon } from "lucide-react"

export default function SolicitarRecoleccionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    tipoMaterial: "plastico",
    cantidad: "",
    fecha: "",
    hora: "",
    direccion: "",
    notas: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de envío
    setTimeout(() => {
      router.push("/usuario/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/usuario/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Nueva Solicitud</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Material */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Tipo de Material
              </Label>
              <RadioGroup
                value={formData.tipoMaterial}
                onValueChange={(value) => setFormData({ ...formData, tipoMaterial: value })}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="plastico" id="plastico" />
                    <Label htmlFor="plastico" className="cursor-pointer flex-1">
                      Plástico PET
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="carton" id="carton" />
                    <Label htmlFor="carton" className="cursor-pointer flex-1">
                      Cartón
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="aluminio" id="aluminio" />
                    <Label htmlFor="aluminio" className="cursor-pointer flex-1">
                      Aluminio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="vidrio" id="vidrio" />
                    <Label htmlFor="vidrio" className="cursor-pointer flex-1">
                      Vidrio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="papel" id="papel" />
                    <Label htmlFor="papel" className="cursor-pointer flex-1">
                      Papel
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="electronico" id="electronico" />
                    <Label htmlFor="electronico" className="cursor-pointer flex-1">
                      Electrónico
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Cantidad Estimada */}
            <div className="space-y-2">
              <Label htmlFor="cantidad">Cantidad Estimada (kg)</Label>
              <Input
                id="cantidad"
                type="number"
                placeholder="15"
                value={formData.cantidad}
                onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                required
              />
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Fecha
                </Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="direccion" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Dirección de Recolección
              </Label>
              <Input
                id="direccion"
                placeholder="Av. Reforma 123, Col. Centro, CDMX"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
              />
            </div>

            {/* Foto del Material */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Foto del Material (Opcional)
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Toca para subir una foto</p>
              </div>
            </div>

            {/* Notas Adicionales */}
            <div className="space-y-2">
              <Label htmlFor="notas">Notas Adicionales (Opcional)</Label>
              <Textarea
                id="notas"
                placeholder="Ej: Material en bolsas, acceso por puerta trasera..."
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                rows={3}
              />
            </div>

            {/* Precio Estimado */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pago Estimado</p>
                  <p className="text-2xl font-bold text-primary">
                    ${formData.cantidad ? (Number.parseInt(formData.cantidad) * 8).toFixed(0) : "0"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Precio por kg</p>
                  <p className="text-sm font-medium text-foreground">$8.00</p>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Enviando solicitud..." : "Solicitar Recolección"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
