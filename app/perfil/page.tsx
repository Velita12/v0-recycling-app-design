"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Recycle,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  ArrowLeft,
  Star,
  Award,
  TrendingUp,
  Package,
} from "lucide-react"

export default function PerfilPage() {
  const [editing, setEditing] = useState(false)
  const [perfil, setPerfil] = useState({
    nombre: "María González",
    email: "maria.gonzalez@email.com",
    telefono: "+52 55 1234 5678",
    direccion: "Av. Reforma 123, Col. Centro, CDMX",
    tipoUsuario: "Usuario",
    bio: "Comprometida con el medio ambiente y el reciclaje responsable.",
  })

  const estadisticas = [
    { label: "Recolecciones", valor: "24", icono: Package, color: "text-primary" },
    { label: "Calificación", valor: "4.8", icono: Star, color: "text-accent" },
    { label: "kg Reciclados", valor: "156", icono: TrendingUp, color: "text-primary" },
    { label: "Nivel", valor: "Oro", icono: Award, color: "text-accent" },
  ]

  const logros = [
    { nombre: "Primer Reciclaje", descripcion: "Completaste tu primera recolección", desbloqueado: true },
    { nombre: "Eco Warrior", descripcion: "100 kg reciclados", desbloqueado: true },
    { nombre: "Constante", descripcion: "10 recolecciones en un mes", desbloqueado: true },
    { nombre: "Maestro del Reciclaje", descripcion: "500 kg reciclados", desbloqueado: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/usuario/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Mi Perfil</span>
            </div>
          </div>
          {editing ? (
            <Button size="sm" onClick={() => setEditing(false)}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Foto de Perfil y Info Básica */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              {editing && (
                <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full" variant="secondary">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground mb-1">{perfil.nombre}</h1>
              <Badge variant="secondary" className="mb-2">
                {perfil.tipoUsuario}
              </Badge>
              <p className="text-sm text-muted-foreground">{perfil.bio}</p>
            </div>
          </div>
        </Card>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {estadisticas.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icono className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.valor}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Información Personal */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Información Personal</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre" className="text-sm font-medium text-foreground">
                Nombre Completo
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="nombre"
                  value={perfil.nombre}
                  onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                  disabled={!editing}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo Electrónico
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  disabled={!editing}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="telefono" className="text-sm font-medium text-foreground">
                Teléfono
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="telefono"
                  value={perfil.telefono}
                  onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
                  disabled={!editing}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="direccion" className="text-sm font-medium text-foreground">
                Dirección
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="direccion"
                  value={perfil.direccion}
                  onChange={(e) => setPerfil({ ...perfil, direccion: e.target.value })}
                  disabled={!editing}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                Biografía
              </Label>
              <Textarea
                id="bio"
                value={perfil.bio}
                onChange={(e) => setPerfil({ ...perfil, bio: e.target.value })}
                disabled={!editing}
                className="mt-1 min-h-20"
                placeholder="Cuéntanos sobre ti..."
              />
            </div>
          </div>
        </Card>

        {/* Logros */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Logros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logros.map((logro, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  logro.desbloqueado ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      logro.desbloqueado ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{logro.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{logro.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
