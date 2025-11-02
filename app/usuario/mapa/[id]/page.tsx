"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Recycle,
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  User,
  Package,
  Clock,
  CheckCircle2,
} from "lucide-react"

export default function MapaSolicitudPage() {
  const [solicitud] = useState({
    id: 1,
    tipo: "Plástico PET",
    cantidad: "15 kg",
    estado: "en-ruta",
    recolector: {
      nombre: "Carlos Méndez",
      telefono: "+52 55 9876 5432",
      foto: null,
      calificacion: 4.8,
      vehiculo: "Camioneta Blanca - ABC-123",
    },
    direccion: "Av. Reforma 123, CDMX",
    tiempoEstimado: "8 min",
    distancia: "1.2 km",
    pagoEstimado: "$120",
  })

  const [ubicacionRecolector, setUbicacionRecolector] = useState({
    lat: 19.4326,
    lng: -99.1332,
  })

  // Simular actualización de ubicación en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setUbicacionRecolector((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card z-10">
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
              <span className="text-lg font-bold text-foreground">Seguimiento en Vivo</span>
            </div>
          </div>
          <Badge className="bg-accent text-accent-foreground animate-pulse">En Ruta</Badge>
        </div>
      </header>

      {/* Mapa */}
      <div className="flex-1 relative bg-muted">
        {/* Placeholder del mapa - En producción usar Google Maps o Mapbox */}
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 relative overflow-hidden">
          {/* Simulación de mapa con grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-foreground/20" />
              ))}
            </div>
          </div>

          {/* Marcador de destino (usuario) */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center animate-bounce">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge variant="secondary" className="text-xs">
                  Tu ubicación
                </Badge>
              </div>
            </div>
          </div>

          {/* Marcador de recolector (animado) */}
          <div
            className="absolute transition-all duration-1000 ease-in-out z-10"
            style={{
              top: `${45 + (ubicacionRecolector.lat - 19.4326) * 1000}%`,
              left: `${50 + (ubicacionRecolector.lng + 99.1332) * 1000}%`,
            }}
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center">
                <Navigation className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <Badge className="text-xs bg-accent text-accent-foreground">Recolector</Badge>
              </div>
              {/* Pulso animado */}
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
            </div>
          </div>

          {/* Línea de ruta */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="50%"
              y1="33%"
              x2={`${50 + (ubicacionRecolector.lng + 99.1332) * 1000}%`}
              y2={`${45 + (ubicacionRecolector.lat - 19.4326) * 1000}%`}
              stroke="oklch(0.55 0.15 145)"
              strokeWidth="3"
              strokeDasharray="10,5"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Info flotante de tiempo estimado */}
        <Card className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="font-semibold text-foreground">{solicitud.tiempoEstimado}</span>
            <span className="text-sm text-muted-foreground">• {solicitud.distancia}</span>
          </div>
        </Card>
      </div>

      {/* Panel inferior con info del recolector */}
      <div className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Card className="p-4 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-lg">{solicitud.recolector.nombre}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <CheckCircle2
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(solicitud.recolector.calificacion)
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{solicitud.recolector.calificacion}</span>
                </div>
                <p className="text-sm text-muted-foreground">{solicitud.recolector.vehiculo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Phone className="w-4 h-4" />
                Llamar
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <MessageCircle className="w-4 h-4" />
                Mensaje
              </Button>
            </div>
          </Card>

          {/* Detalles de la solicitud */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Detalles de la Recolección</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Material</span>
                </div>
                <span className="font-medium text-foreground">
                  {solicitud.tipo} • {solicitud.cantidad}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Dirección</span>
                </div>
                <span className="font-medium text-foreground text-right text-sm">{solicitud.direccion}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Pago Estimado</span>
                <span className="text-xl font-bold text-primary">{solicitud.pagoEstimado}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
