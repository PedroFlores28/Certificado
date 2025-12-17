Roles y permisos:
¿Quién puede emitir diplomas? (solo administradores o también otros roles)
Solo admin por ahora.

¿Hay diferentes niveles de acceso? (super admin, admin, viewer)
 Admin (puede crear badge, puede emitir, puede borrar) y perfil publico. 

Datos del diploma:
¿Qué campos son obligatorios para emitir un diploma? (nombre completo, tipo de embajador, fecha, etc.)
Para la base de datos , id, nombre completo, dni, fecha de emisión, link de certificado

Para este caso particular, se muestran:
Nombre: Rebeca Consuelo Aguilar Chaw
Motivo Emisión: Por ser Una Embajadora UPC
Clasificación: Deportista destacada de escalada
Mensaje de Agradecimiento: Tu entrega nos llega de orgullo!

¿Hay campos opcionales o personalizables?
¿El diploma es siempre el mismo tipo o hay variantes? (por ejemplo, diferentes categorías de embajadores)
Por ahora el prototipo será para este diploma.

Emisión masiva:
¿En qué formato se recibirán los datos? (CSV, Excel, JSON)
CSV

¿Qué validaciones se deben hacer antes de emitir?
Que estén todas las columnas necesarias y la cuenta de registros.

¿Se debe notificar a los beneficiarios al emitir?
Si.

Perfil público del diploma:
¿Qué información debe mostrar? (nombre, fecha, tipo de reconocimiento, ID único, etc.)
Debe ser como el certificado en jpg que puse.

¿Debe incluir un código QR para verificación?
No

¿Debe permitir descargar el diploma como imagen/PDF?
No ahora.

Verificación:
¿Cómo se verifica un diploma? (solo con el ID único en la URL)
Si

¿Debe mostrar información de validez/revocación?
Este certificado es permanente.

Panel de administración:
¿Qué funcionalidades específicas necesita? (búsqueda, filtros, exportación, etc.)
Crear nuevo certificado de embajadores, Dentro de cada certificado o edicion ver la base de datos y el status y que se pueda descargar.

¿Debe mostrar estadísticas o reportes?
Certificados emitidos, 

Metadatos para LinkedIn:
¿Qué metadatos específicos necesita? (Open Badges, JSON-LD, etc.)
Tu sugiere si es necesario algun metadato especifico o solo subir un id.

Revocación:
¿Quién puede revocar y bajo qué condiciones?
Solo el admin.

¿Qué debe pasar con el diploma revocado? (¿se marca como revocado o se oculta?)
Se oculta y se actualizan los estados.