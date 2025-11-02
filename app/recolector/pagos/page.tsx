"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Recycle, ArrowLeft, DollarSign, Clock, CheckCircle2, CreditCard, TrendingUp, Calendar } from "lucide-react"

export default function PagosRecolectorPage() {
  const [pagosPendientes] = useState([
    {
      id: 1,
      tipo: "Plástico PET",
      cantidad: "14.5 kg",
      monto: "$36",
      fecha: "2025-01-20",
      estado: "en-verificacion",
      centro: "EcoCenter CDMX",
    },
  ])

  const [pagosCompletados] = useState([
    {
      id: 2,
      tipo: "Cartón",
      cantidad: "30 kg",
      monto: "$72",
      fecha: "2025-01-18",
      fechaPago: "2025-01-19",
      estado: "pagado",
      centro: "EcoCenter CDMX",
    },
    {
      id: 3,
      tipo: "Aluminio",
      cantidad: "7.5 kg",
      monto: "$18",
      fecha: "2025-01-15",
      fechaPago: "2025-01-16",
      estado: "pagado",
      centro: "EcoCenter CDMX",
    },
  ])

  const totalGanado = pagosCompletados.reduce((sum, pago) => sum + Number.parseFloat(pago.monto.replace("$", "")), 0)
  const totalPendiente = pagosPendientes.reduce((sum, pago) => sum + Number.parseFloat(pago.monto.replace("$", "")), 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/recolector/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Mis Ganancias</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Resumen de Ganancias */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ganado</p>
                <p className="text-3xl font-bold text-primary">${totalGanado.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-accent/5 border-accent/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En Proceso</p>
                <p className="text-3xl font-bold text-accent">${totalPendiente.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Este Mes</p>
                <p className="text-3xl font-bold text-foreground">$2,840</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Método de Pago */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Método de Pago
          </h3>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Transferencia Bancaria</p>
                <p className="text-sm text-muted-foreground">Santander •••• 8901</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Cambiar
            </Button>
          </div>
        </Card>

        {/* Información de Comisión */}
        <Card className="p-6 mb-6 bg-accent/5 border-accent/20">
          <h3 className="font-semibold text-foreground mb-3">Estructura de Pagos</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tu comisión por recolección</span>
              <span className="font-semibold text-foreground">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Pago al usuario/empresa</span>
              <span className="font-semibold text-foreground">70%</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">
              Los pagos se procesan automáticamente después de la verificación del centro de reciclaje
            </p>
          </div>
        </Card>

        {/* Tabs de Historial */}
        <Tabs defaultValue="completados" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="completados">Completados ({pagosCompletados.length})</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes ({pagosPendientes.length})</TabsTrigger>
          </TabsList>

          {/* Pagos Completados */}
          <TabsContent value="completados" className="space-y-4">
            {pagosCompletados.map((pago) => (
              <Card key={pago.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{pago.tipo}</h3>
                      <p className="text-sm text-muted-foreground">{pago.cantidad} recolectados</p>
                      <p className="text-xs text-muted-foreground mt-1">{pago.centro}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{pago.monto}</p>
                    <Badge className="mt-1 bg-primary text-primary-foreground">Pagado</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Pagado: {pago.fechaPago}</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Pagos Pendientes */}
          <TabsContent value="pendientes" className="space-y-4">
            {pagosPendientes.map((pago) => (
              <Card key={pago.id} className="p-4 border-accent/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">{pago.tipo}</h3>
                      <p className="text-sm text-muted-foreground">{pago.cantidad} recolectados</p>
                      <p className="text-xs text-muted-foreground mt-1">{pago.centro}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-accent">{pago.monto}</p>
                    <Badge variant="secondary" className="mt-1">
                      En Verificación
                    </Badge>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    El centro está verificando el material. Tu pago se procesará en 24-48 horas.
                  </p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
