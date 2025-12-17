# Product Requirements Document (PRD)
## Sistema de Badges Digitales para Embajadores UPC v2.0

**Versión:** 1.0  
**Fecha:** 2025  
**Cliente:** UPC  
**Estado:** Primera Etapa - Prototipo

---

## 1. Introducción y Contexto

### 1.1 Descripción del Proyecto
La Universidad Peruana de Ciencias Aplicadas (UPC) busca implementar un sistema de credenciales digitales (badges) que permita reconocer a los Embajadores UPC con un diploma digital verificable, compatible con LinkedIn y con metadatos estructurados.

Este sistema permitirá emitir, gestionar, verificar y compartir badges de forma institucional con un diseño visual profesional que refleje la identidad de marca UPC.

### 1.2 Objetivos del Proyecto
- Implementar un sistema de emisión de diplomas digitales para Embajadores UPC
- Proporcionar una URL única y verificable para cada diploma
- Facilitar la compatibilidad con LinkedIn (sección Licenses & Certifications)
- Ofrecer un panel administrativo para gestión de diplomas
- Crear un perfil público para visualización y verificación de diplomas

### 1.3 Alcance de la Primera Etapa
En esta primera etapa, el sistema **NO** debe cumplir con el protocolo completo de e-certs, pero debe simularlo. El sistema debe incluir:
- Panel de administración para gestión de diplomas
- Perfil público del diploma con visualización del certificado
- ID único para cada diploma
- Sistema de verificación mediante URL única
- Funcionalidades básicas de emisión, visualización y revocación

---

## 2. Roles y Permisos

### 2.1 Roles del Sistema

#### 2.1.1 Administrador (Admin)
**Permisos:**
- Crear nuevos certificados/badges
- Emitir diplomas (individual o masiva)
- Editar diplomas existentes
- Revocar diplomas
- Ver base de datos de diplomas emitidos
- Ver estadísticas de certificados emitidos
- Descargar información de diplomas

#### 2.1.2 Usuario Público
**Permisos:**
- Visualizar diploma mediante URL única
- Verificar validez del diploma
- Compartir enlace del diploma

---

## 3. Estructura de Datos

### 3.1 Campos de Base de Datos
**Campos obligatorios:**
- `id` (UUID único)
- `nombre_completo` (string)
- `dni` (string)
- `fecha_emision` (date)
- `link_certificado` (URL única)
- `status` (enum: activo, revocado)
- `fecha_creacion` (timestamp)
- `fecha_actualizacion` (timestamp)

### 3.2 Campos para Visualización del Diploma
**Información mostrada en el certificado:**
- **Nombre completo:** Ej: "Rebeca Consuelo Aguilar Chaw"
- **Motivo de Emisión:** Ej: "Por ser Una Embajadora UPC"
- **Clasificación:** Ej: "Deportista destacada de escalada"
- **Mensaje de Agradecimiento:** Ej: "¡Tu entrega nos llena de orgullo!"
- **Fecha:** Mes y año (Ej: "Diciembre, 2025")
- **Firmantes:**
  - Rector: Edward Roekaert
  - Vicerrectora Académica y de Investigación: Milagros Morgan

### 3.3 Plantilla del Diploma
- El diseño debe basarse en el certificado de referencia (`Certificado Terminado.jpeg`)
- Utilizar el fondo SVG proporcionado (`certificado-upc-2.svg`)
- Aplicar branding institucional UPC según `ui-parametros.md`

---

## 4. Requerimientos Funcionales

### 4.1 Panel de Administración

#### 4.1.1 Gestión de Diplomas
- Crear nuevo certificado de embajador
- Editar certificado existente
- Ver lista de todos los certificados emitidos
- Ver detalles de cada certificado (base de datos y status)
- Descargar información de certificados

#### 4.1.2 Emisión de Diplomas

**Emisión Individual:**
- Formulario para ingresar datos del beneficiario
- Validación de campos obligatorios
- Generación automática de ID único
- Generación de URL única del certificado
- Notificación al beneficiario (si aplica)

**Emisión Masiva:**
- Carga de archivo CSV con múltiples beneficiarios
- Validación de columnas requeridas:
  - nombre_completo
  - dni
  - motivo_emision (opcional, puede tener valor por defecto)
  - clasificacion (opcional, puede tener valor por defecto)
  - mensaje_agradecimiento (opcional, puede tener valor por defecto)
- Validación de cantidad de registros
- Procesamiento en lote
- Generación masiva de IDs únicos y URLs
- Notificación masiva a beneficiarios
- Reporte de emisión (exitosos, errores)

#### 4.1.3 Revocación de Diplomas
- Opción para revocar diploma desde panel admin
- Actualización de status a "revocado"
- Ocultamiento del diploma en perfil público
- Actualización de estados en base de datos

#### 4.1.4 Estadísticas y Reportes
- Contador de certificados emitidos
- Filtros por fecha, status, etc.
- Exportación de datos (opcional para futuras versiones)

### 4.2 Perfil Público del Diploma

#### 4.2.1 Visualización
- Página pública accesible mediante URL única
- Renderizado del diploma con diseño completo
- Información del beneficiario
- Fecha de emisión
- ID único visible
- Diseño responsive

#### 4.2.2 Verificación
- Verificación mediante ID único en la URL
- Validación de existencia del diploma
- Indicador de validez (si está activo o revocado)
- Los diplomas revocados no deben ser accesibles públicamente

### 4.3 Compatibilidad con LinkedIn
- Metadatos estructurados para LinkedIn (Open Badges o JSON-LD)
- URL verificable que LinkedIn pueda indexar
- Información estructurada del certificado

---

## 5. Historias de Usuario

### 5.1 Gestión de Diplomas (Admin)

#### HU-001: Crear Nuevo Certificado
**Como** administrador del sistema  
**Quiero** crear un nuevo certificado de embajador UPC  
**Para** poder emitir diplomas a los beneficiarios

**Criterios de Aceptación:**
- Debe existir un botón "Crear Nuevo Certificado" en el panel admin
- El formulario debe incluir campos para: nombre completo, DNI, motivo de emisión, clasificación, mensaje de agradecimiento
- El sistema debe generar automáticamente un ID único y URL del certificado
- Al guardar, debe crearse el registro en la base de datos con status "activo"

#### HU-002: Emitir Diploma Individual
**Como** administrador del sistema  
**Quiero** emitir un diploma a un beneficiario individual  
**Para** reconocer su participación como Embajador UPC

**Criterios de Aceptación:**
- Debe existir un formulario con todos los campos obligatorios
- El sistema debe validar que todos los campos requeridos estén completos
- Al emitir, debe generarse el diploma con diseño completo
- Debe generarse una URL única accesible públicamente
- El beneficiario debe recibir notificación (email o similar)
- El diploma debe aparecer en la lista de certificados emitidos

#### HU-003: Emitir Diplomas Masivamente
**Como** administrador del sistema  
**Quiero** cargar un archivo CSV con múltiples beneficiarios  
**Para** emitir diplomas de forma eficiente a varios embajadores

**Criterios de Aceptación:**
- Debe existir opción para "Emisión Masiva" con carga de archivo CSV
- El sistema debe validar que el CSV tenga todas las columnas necesarias
- Debe mostrar un resumen de registros a procesar antes de confirmar
- El sistema debe procesar todos los registros válidos
- Debe mostrar reporte de emisión: exitosos y errores
- Cada beneficiario debe recibir notificación individual
- Todos los diplomas emitidos deben aparecer en la lista de certificados

#### HU-004: Ver Lista de Certificados Emitidos
**Como** administrador del sistema  
**Quiero** ver la lista de todos los certificados emitidos  
**Para** gestionar y monitorear los diplomas del sistema

**Criterios de Aceptación:**
- Debe mostrar tabla con: nombre, DNI, fecha de emisión, status, link
- Debe incluir búsqueda por nombre o DNI
- Debe mostrar contador total de certificados emitidos
- Cada fila debe tener opción para ver detalles, editar o revocar

#### HU-005: Ver Detalles de Certificado
**Como** administrador del sistema  
**Quiero** ver los detalles completos de un certificado  
**Para** revisar la información y el estado del diploma

**Criterios de Aceptación:**
- Al hacer clic en un certificado, debe mostrar vista detallada
- Debe mostrar todos los datos de la base de datos
- Debe mostrar el status actual (activo/revocado)
- Debe mostrar la URL pública del certificado
- Debe permitir editar o revocar desde esta vista
- Debe permitir descargar información del certificado

#### HU-006: Editar Certificado
**Como** administrador del sistema  
**Quiero** editar la información de un certificado existente  
**Para** corregir errores o actualizar datos

**Criterios de Aceptación:**
- Debe existir opción "Editar" en la vista de detalles
- El formulario debe pre-llenarse con datos actuales
- Debe permitir modificar: nombre, DNI, motivo, clasificación, mensaje
- No debe permitir modificar ID único ni fecha de emisión original
- Al guardar, debe actualizar fecha_actualizacion
- El diploma público debe reflejar los cambios

#### HU-007: Revocar Diploma
**Como** administrador del sistema  
**Quiero** revocar un diploma  
**Para** invalidar un certificado cuando sea necesario

**Criterios de Aceptación:**
- Debe existir opción "Revocar" en la vista de detalles
- Debe solicitar confirmación antes de revocar
- Al revocar, debe cambiar status a "revocado"
- El diploma debe ocultarse del perfil público (URL debe retornar 404 o mensaje de revocado)
- Debe actualizarse fecha_actualizacion
- El certificado debe seguir visible en el panel admin pero marcado como revocado

#### HU-008: Ver Estadísticas de Certificados
**Como** administrador del sistema  
**Quiero** ver estadísticas de certificados emitidos  
**Para** tener un resumen del uso del sistema

**Criterios de Aceptación:**
- Debe mostrar contador total de certificados emitidos
- Debe mostrar contador de certificados activos
- Debe mostrar contador de certificados revocados
- Debe mostrar gráfico o lista de emisiones por período (opcional)

### 5.2 Visualización Pública (Usuario Final)

#### HU-009: Visualizar Diploma Público
**Como** beneficiario o persona que recibe el enlace  
**Quiero** ver mi diploma digital  
**Para** compartirlo o verificar mi reconocimiento

**Criterios de Aceptación:**
- Debe ser accesible mediante URL única sin autenticación
- Debe mostrar el diploma completo con diseño institucional
- Debe mostrar: nombre completo, motivo, clasificación, mensaje, fecha
- Debe mostrar ID único del certificado
- Debe ser responsive (funcionar en móvil y desktop)
- El diseño debe coincidir con el certificado de referencia

#### HU-010: Verificar Validez del Diploma
**Como** persona que recibe un enlace de diploma  
**Quiero** verificar que el diploma es válido y oficial  
**Para** confirmar su autenticidad

**Criterios de Aceptación:**
- La URL debe contener el ID único del certificado
- El sistema debe validar que el certificado existe y está activo
- Si el certificado está revocado, debe mostrar mensaje indicando que no está disponible
- Si el ID no existe, debe mostrar error 404
- El diploma debe mostrar información que permita verificar su origen (UPC)

#### HU-011: Compartir Diploma en LinkedIn
**Como** beneficiario del diploma  
**Quiero** agregar mi certificado a mi perfil de LinkedIn  
**Para** mostrar mi reconocimiento profesionalmente

**Criterios de Aceptación:**
- El diploma debe incluir metadatos estructurados (Open Badges o JSON-LD)
- La URL debe ser indexable por LinkedIn
- Debe proporcionarse instrucciones claras de cómo agregar a LinkedIn
- Los metadatos deben incluir: nombre del certificado, emisor (UPC), fecha, descripción

---

## 6. Requerimientos No Funcionales

### 6.1 Seguridad
- Autenticación segura para panel de administración
- Protección de datos personales (DNI, nombres)
- Validación de entrada en todos los formularios
- Prevención de inyección SQL y XSS
- URLs únicas con IDs no predecibles (UUID)

### 6.2 Disponibilidad
- Alta disponibilidad del sistema
- Tiempo de respuesta razonable (< 2 segundos para carga de página)
- Sistema debe estar disponible 24/7 para visualización pública

### 6.3 Usabilidad
- Interfaz intuitiva y fácil de usar para administradores
- Diseño responsive para todos los dispositivos
- Mensajes de error claros y útiles
- Confirmaciones para acciones destructivas (revocación)

### 6.4 Rendimiento
- Carga rápida de diplomas públicos
- Procesamiento eficiente de emisiones masivas
- Optimización de imágenes y recursos

### 6.5 Costos
- Bajos costos operativos
- Uso eficiente de recursos de servidor
- Solución escalable

---

## 7. Diseño y UI

### 7.1 Guía de Estilo
**Colores:**
- Color primario y acento: `#E50A17`
- Fondo blanco con letras en: `#1F2A37`
- Fondos alternados con gris: `#F3F4F6`

**Tipografías:**
- Títulos: UPC Gothic (fuentes disponibles en assets)
- Subtítulos: Zizou Slab (Zizou Slab-Medium.otf)
- Cuerpo del mensaje: Public Sans Regular

### 7.2 Diseño del Diploma
- Basado en el certificado de referencia (`Certificado Terminado.jpeg`)
- Fondo SVG: `certificado-upc-2.svg`
- Sección superior: fondo azul oscuro con título "DÍA DE LOS EMBAJADORES UPC"
- Sección inferior: fondo gris claro con información del beneficiario
- Elementos decorativos: estrellas doradas, formas geométricas
- Firmas: Rector y Vicerrectora Académica

### 7.3 Panel de Administración
- Diseño limpio y profesional
- Navegación clara entre secciones
- Tablas con información organizada
- Formularios con validación visual
- Mensajes de éxito/error claros

---

## 8. Metadatos para LinkedIn

### 8.1 Recomendación de Metadatos
Para compatibilidad con LinkedIn, se recomienda implementar metadatos en formato **Open Badges 2.0** o **JSON-LD** con el siguiente esquema:

```json
{
  "@context": "https://w3id.org/openbadges/v2",
  "type": "Assertion",
  "id": "https://certificados.upc.edu.pe/certificado/{id-unico}",
  "badge": {
    "id": "https://certificados.upc.edu.pe/badge/embajador-upc",
    "type": "BadgeClass",
    "name": "Embajador UPC",
    "description": "Reconocimiento como Embajador UPC",
    "image": "https://certificados.upc.edu.pe/assets/badge-image.png",
    "issuer": {
      "id": "https://www.upc.edu.pe",
      "type": "Profile",
      "name": "Universidad Peruana de Ciencias Aplicadas",
      "url": "https://www.upc.edu.pe"
    }
  },
  "recipient": {
    "type": "email",
    "hashed": false,
    "identity": "recipient@example.com"
  },
  "issuedOn": "2025-12-01",
  "verification": {
    "type": "hosted",
    "url": "https://certificados.upc.edu.pe/certificado/{id-unico}"
  }
}
```

### 8.2 Implementación
- Los metadatos deben estar disponibles en la página pública del diploma
- Pueden incluirse como JSON-LD en el `<head>` del HTML
- La URL del certificado debe ser verificable públicamente

---

## 9. Flujos Principales

### 9.1 Flujo de Emisión Individual
1. Admin accede al panel de administración
2. Admin hace clic en "Crear Nuevo Certificado" o "Emitir Diploma"
3. Admin completa formulario con datos del beneficiario
4. Sistema valida campos obligatorios
5. Sistema genera ID único y URL del certificado
6. Sistema crea registro en base de datos
7. Sistema genera diploma con diseño completo
8. Sistema envía notificación al beneficiario (si aplica)
9. Diploma queda disponible en perfil público

### 9.2 Flujo de Emisión Masiva
1. Admin accede a "Emisión Masiva"
2. Admin carga archivo CSV
3. Sistema valida estructura del CSV (columnas requeridas)
4. Sistema muestra resumen de registros a procesar
5. Admin confirma emisión
6. Sistema procesa cada registro:
   - Genera ID único
   - Genera URL única
   - Crea registro en BD
   - Genera diploma
   - Envía notificación
7. Sistema muestra reporte de emisión (exitosos/errores)
8. Diplomas quedan disponibles en perfiles públicos

### 9.3 Flujo de Visualización Pública
1. Usuario accede a URL única del certificado
2. Sistema valida ID único en la URL
3. Sistema verifica que el certificado existe y está activo
4. Si está activo: muestra diploma completo
5. Si está revocado: muestra mensaje de no disponible
6. Si no existe: muestra error 404

### 9.4 Flujo de Revocación
1. Admin accede a detalles del certificado
2. Admin hace clic en "Revocar"
3. Sistema solicita confirmación
4. Admin confirma revocación
5. Sistema actualiza status a "revocado"
6. Sistema actualiza fecha_actualizacion
7. Diploma se oculta del perfil público
8. URL pública retorna mensaje de revocado o 404

---

## 10. Validaciones y Reglas de Negocio

### 10.1 Validaciones de Emisión Individual
- Nombre completo: obligatorio, mínimo 3 caracteres
- DNI: obligatorio, formato válido (8 dígitos para DNI peruano)
- Motivo de emisión: puede tener valor por defecto
- Clasificación: puede tener valor por defecto
- Mensaje de agradecimiento: puede tener valor por defecto

### 10.2 Validaciones de Emisión Masiva
- Archivo CSV debe tener columnas: nombre_completo, dni
- Columnas opcionales: motivo_emision, clasificacion, mensaje_agradecimiento
- Validar que no haya registros duplicados (mismo DNI)
- Validar formato de DNI en cada registro
- Mostrar cuenta total de registros antes de procesar

### 10.3 Reglas de Negocio
- Cada diploma tiene un ID único permanente (no se modifica)
- La fecha de emisión no se puede modificar después de creada
- Un diploma revocado no puede reactivarse (requeriría crear uno nuevo)
- Los diplomas son permanentes (no expiran)
- Un mismo DNI puede tener múltiples diplomas (diferentes reconocimientos)

---

## 11. Entregables de la Primera Etapa

### 11.1 Panel de Administración
- [ ] Sistema de autenticación para admin
- [ ] Dashboard con estadísticas básicas
- [ ] Formulario de emisión individual
- [ ] Sistema de emisión masiva (CSV)
- [ ] Lista de certificados emitidos
- [ ] Vista de detalles de certificado
- [ ] Funcionalidad de edición
- [ ] Funcionalidad de revocación
- [ ] Notificaciones a beneficiarios

### 11.2 Perfil Público
- [ ] Página pública con URL única
- [ ] Renderizado del diploma con diseño completo
- [ ] Sistema de verificación por ID único
- [ ] Manejo de diplomas revocados
- [ ] Metadatos para LinkedIn

### 11.3 Base de Datos
- [ ] Esquema de base de datos
- [ ] Tabla de certificados con todos los campos requeridos
- [ ] Índices para búsqueda eficiente

### 11.4 Diseño
- [ ] Implementación del diseño del diploma basado en referencia
- [ ] Aplicación de guía de estilo UPC
- [ ] Diseño responsive

---

## 12. Notas Técnicas

### 12.1 Tecnologías Sugeridas
- Backend: Node.js, Python, o similar
- Frontend: React, Vue, o framework moderno
- Base de datos: PostgreSQL o MySQL
- Generación de diplomas: Canvas API, SVG, o librería de PDF
- Autenticación: JWT o similar

### 12.2 Consideraciones Futuras
- Implementación completa del protocolo e-certs
- Descarga de diplomas como PDF/imagen
- Código QR para verificación
- Sistema de notificaciones más robusto
- Exportación de reportes
- Múltiples plantillas de diplomas
- API pública para integraciones

---

## 13. Anexos

### 13.1 Referencias
- Brief del proyecto: `Brief-proyecto.md`
- Guía de UI: `ui-parametros.md`
- Certificado de referencia: `assets/Certificado Terminado.jpeg`
- Fondo SVG: `assets/certificado-upc-2.svg`
- Fuentes: `assets/upc_sgothic-bdcap-webfont.ttf`, `assets/Zizou Slab-Medium.otf`

### 13.2 Glosario
- **Badge:** Credencial digital verificable
- **Diploma:** Documento digital que representa el reconocimiento
- **Embajador UPC:** Beneficiario del reconocimiento
- **ID único:** Identificador único e irrepetible del certificado
- **URL única:** Enlace público para acceder al diploma
- **Revocación:** Invalidación de un diploma emitido

---

**Fin del Documento**

