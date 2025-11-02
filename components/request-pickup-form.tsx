"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Calendar, Package, ArrowRight } from "lucide-react"

const materialTypes = [
  { id: "plastico", name: "Plástico", price: "$2/kg" },
  { id: "papel", name: "Papel/Cartón", price: "$1.5/kg" },
  { id: "vidrio", name: "Vidrio", price: "$1/kg" },
  { id: "metal", name: "Metal", price: "$5/kg" },
  { id: "electronico", name: "Electrónico", price: "$8/kg" },
]

export function RequestPickupForm() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("")
  const [estimatedWeight, setEstimatedWeight] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [scheduledDate, setScheduledDate] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Solicitud de recolección:", {
      selectedMaterial,
      estimatedWeight,
      address,
      notes,
      scheduledDate,
    })
    // Aquí iría la lógica para enviar la solicitud
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-card-foreground mb-2">Solicitar Recolección</h2>
        <p className="text-muted-foreground">Completa los detalles de tu material reciclable</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Material */}
        <div className="space-y-3">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Package className="w-4 h-4" />
            Tipo de Material
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {materialTypes.map((material) => (
              <button
                key={material.id}
                type="button"
                onClick={() => setSelectedMaterial(material.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedMaterial === material.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="font-semibold text-sm text-card-foreground">{material.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{material.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Peso Estimado */}
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-base font-semibold">
            Peso Estimado (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="Ej: 15"
            value={estimatedWeight}
            onChange={(e) => setEstimatedWeight(e.target.value)}
            className="text-base"
          />
          {estimatedWeight && selectedMaterial && (
            <p className="text-sm text-muted-foreground">
              Valor estimado: ${(Number.parseFloat(estimatedWeight) * 2).toFixed(2)}
            </p>
          )}
        </div>

        {/* Dirección */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-base font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Dirección de Recolección
          </Label>
          <Input
            id="address"
            placeholder="Calle, número, colonia, ciudad"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="text-base"
          />
        </div>

        {/* Fecha Programada */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha y Hora Preferida
          </Label>
          <Input
            id="date"
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="text-base"
          />
        </div>

        {/* Notas Adicionales */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-base font-semibold">
            Notas Adicionales (Opcional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Instrucciones especiales, ubicación exacta, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="text-base resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full text-base"
          disabled={!selectedMaterial || !estimatedWeight || !address}
        >
          Solicitar Recolección
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </Card>
  )
}
