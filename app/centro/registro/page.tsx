"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Recycle,
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  CheckCircle2,
  Upload,
} from "lucide-react"

export default function RegistroCentroPage() {
  const [paso, setPaso] = useState(1)
  const [formData, setFormData] = useState({
    nombreCentro: "",
    razonSocial: "",
    rfc: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    descripcion: "",
    materialesAceptados: [] as string[],
    capacidadDiaria: "",
    horarioApertura: "",
    horarioCierre: "",
    precioPlastico: "",
    precioCarton: "",
    precioVidrio: "",
    precioAluminio: "",
    precioElectronicos: "",
  })

  const materialesDisponibles = [
    "Plástico PET",
    "Cartón",
    "Vidrio",
    "Aluminio",
    "Papel",
    "Electrónicos",
    "Metales",
    "Textiles",
  ]

  const handleMaterialToggle = (material: string) => {
    setFormData((prev) => ({
      ...prev,
      materialesAceptados: prev.materialesAceptados.includes(material)
        ? prev.materialesAceptados.filter((m) => m !== material)
        : [...prev.materialesAceptados, material],
    }))
  }

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar el formulario
    setPaso(4)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Registrar Centro de Reciclaje</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Indicador de progreso */}
        {paso < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      paso >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {paso > num ? <CheckCircle2 className="w-5 h-5" /> : num}
                  </div>
                  {num < 3 && <div className={`flex-1 h-1 mx-2 ${paso > num ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Información Básica</span>
              <span>Materiales y Precios</span>
              <span>Documentación</span>
            </div>
          </div>
        )}

        {/* Paso 1: Información Básica */}
        {paso === 1 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Información del Centro</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nombreCentro">Nombre del Centro *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="nombreCentro"
                    placeholder="Ej: EcoRecicla Centro Norte"
                    value={formData.nombreCentro}
                    onChange={(e) => setFormData({ ...formData, nombreCentro: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="razonSocial">Razón Social *</Label>
                <Input
                  id="razonSocial"
                  placeholder="Nombre legal de la empresa"
                  value={formData.razonSocial}
                  onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="rfc">RFC *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rfc"
                    placeholder="ABC123456XYZ"
                    value={formData.rfc}
                    onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Correo Electrónico *</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contacto@centro.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="telefono"
                      placeholder="+52 55 1234 5678"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="direccion">Dirección Completa *</Label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="direccion"
                    placeholder="Calle, número, colonia"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Input
                    id="ciudad"
                    placeholder="CDMX"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    placeholder="Ciudad de México"
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="codigoPostal">Código Postal *</Label>
                  <Input
                    id="codigoPostal"
                    placeholder="01000"
                    value={formData.codigoPostal}
                    onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="descripcion">Descripción del Centro</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe tu centro de reciclaje, servicios adicionales, etc."
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="mt-1 min-h-24"
                />
              </div>
            </div>

            <Button onClick={() => setPaso(2)} className="w-full mt-6">
              Continuar
            </Button>
          </Card>
        )}

        {/* Paso 2: Materiales y Precios */}
        {paso === 2 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Materiales y Precios</h2>

            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Materiales que Acepta *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {materialesDisponibles.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={material}
                        checked={formData.materialesAceptados.includes(material)}
                        onCheckedChange={() => handleMaterialToggle(material)}
                      />
                      <label
                        htmlFor={material}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacidadDiaria">Capacidad Diaria (kg) *</Label>
                  <Input
                    id="capacidadDiaria"
                    type="number"
                    placeholder="1000"
                    value={formData.capacidadDiaria}
                    onChange={(e) => setFormData({ ...formData, capacidadDiaria: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="horarioApertura">Apertura *</Label>
                    <Input
                      id="horarioApertura"
                      type="time"
                      value={formData.horarioApertura}
                      onChange={(e) => setFormData({ ...formData, horarioApertura: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="horarioCierre">Cierre *</Label>
                    <Input
                      id="horarioCierre"
                      type="time"
                      value={formData.horarioCierre}
                      onChange={(e) => setFormData({ ...formData, horarioCierre: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Precios por Kilogramo (MXN) *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="precioPlastico" className="text-sm text-muted-foreground">
                      Plástico PET
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="precioPlastico"
                        type="number"
                        step="0.01"
                        placeholder="8.00"
                        value={formData.precioPlastico}
                        onChange={(e) => setFormData({ ...formData, precioPlastico: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="precioCarton" className="text-sm text-muted-foreground">
                      Cartón
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="precioCarton"
                        type="number"
                        step="0.01"
                        placeholder="3.50"
                        value={formData.precioCarton}
                        onChange={(e) => setFormData({ ...formData, precioCarton: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="precioVidrio" className="text-sm text-muted-foreground">
                      Vidrio
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="precioVidrio"
                        type="number"
                        step="0.01"
                        placeholder="2.00"
                        value={formData.precioVidrio}
                        onChange={(e) => setFormData({ ...formData, precioVidrio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="precioAluminio" className="text-sm text-muted-foreground">
                      Aluminio
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="precioAluminio"
                        type="number"
                        step="0.01"
                        placeholder="15.00"
                        value={formData.precioAluminio}
                        onChange={(e) => setFormData({ ...formData, precioAluminio: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="precioElectronicos" className="text-sm text-muted-foreground">
                      Electrónicos
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="precioElectronicos"
                        type="number"
                        step="0.01"
                        placeholder="20.00"
                        value={formData.precioElectronicos}
                        onChange={(e) => setFormData({ ...formData, precioElectronicos: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setPaso(1)} className="flex-1">
                Atrás
              </Button>
              <Button onClick={() => setPaso(3)} className="flex-1">
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* Paso 3: Documentación */}
        {paso === 3 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Documentación Requerida</h2>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Acta Constitutiva</p>
                <p className="text-sm text-muted-foreground mb-3">PDF o imagen (máx. 5MB)</p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Comprobante de Domicilio</p>
                <p className="text-sm text-muted-foreground mb-3">PDF o imagen (máx. 5MB)</p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Licencia de Funcionamiento</p>
                <p className="text-sm text-muted-foreground mb-3">PDF o imagen (máx. 5MB)</p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">Identificación Oficial del Representante</p>
                <p className="text-sm text-muted-foreground mb-3">PDF o imagen (máx. 5MB)</p>
                <Button variant="outline" size="sm">
                  Seleccionar Archivo
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Nota:</strong> Todos los documentos serán revisados por nuestro
                equipo. El proceso de verificación puede tomar de 2 a 5 días hábiles.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setPaso(2)} className="flex-1">
                Atrás
              </Button>
              <Button onClick={handleSubmit} className="flex-1">
                Enviar Solicitud
              </Button>
            </div>
          </Card>
        )}

        {/* Paso 4: Confirmación */}
        {paso === 4 && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">¡Solicitud Enviada!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Tu solicitud para registrar el centro de reciclaje ha sido enviada exitosamente. Nuestro equipo revisará
              la información y documentación en los próximos 2-5 días hábiles.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground mb-2">
                <strong>Número de Solicitud:</strong> #RC-2025-{Math.floor(Math.random() * 10000)}
              </p>
              <p className="text-sm text-muted-foreground">
                Recibirás un correo electrónico a <strong>{formData.email}</strong> con los siguientes pasos.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
