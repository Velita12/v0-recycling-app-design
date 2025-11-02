"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Recycle, ArrowLeft, Users, Truck, Building2 } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"usuario" | "recolector" | "centro">("usuario")
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de registro - en producción conectar con Supabase
    setTimeout(() => {
      router.push(`/${userType}/dashboard`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <Card className="p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Recycle className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Crear Cuenta</h1>
          <p className="text-center text-muted-foreground mb-8">Únete a la revolución del reciclaje</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label>Tipo de cuenta</Label>
              <RadioGroup value={userType} onValueChange={(value: any) => setUserType(value)}>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="usuario" id="usuario" />
                  <Label htmlFor="usuario" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Usuario / Empresa</div>
                      <div className="text-xs text-muted-foreground">Solicita recolecciones</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="recolector" id="recolector" />
                  <Label htmlFor="recolector" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Recolector</div>
                      <div className="text-xs text-muted-foreground">Acepta solicitudes</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="centro" id="centro" />
                  <Label htmlFor="centro" className="flex items-center gap-3 cursor-pointer flex-1">
                    <Building2 className="w-5 h-5 text-accent" />
                    <div>
                      <div className="font-medium">Centro de Reciclaje</div>
                      <div className="text-xs text-muted-foreground">Gestiona materiales</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+52 123 456 7890"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
