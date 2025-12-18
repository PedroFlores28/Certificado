# 🚀 Guía Completa: Configurar MongoDB Atlas desde Cero

## 📋 Paso 1: Crear Cuenta en MongoDB Atlas

1. **Ve a:** https://www.mongodb.com/cloud/atlas/register
2. **Regístrate:**
   - Puedes usar tu cuenta de Google, GitHub o crear una nueva
   - Completa el formulario de registro
   - Verifica tu email si es necesario

## 📋 Paso 2: Crear un Cluster Gratuito

1. **Después de iniciar sesión**, verás la pantalla de bienvenida
2. **Selecciona:** "Build a Database" o "Create a Deployment"
3. **Elige el plan FREE (M0):**
   - Es completamente gratuito
   - Tiene 512 MB de almacenamiento (suficiente para tus 872 certificados)
4. **Selecciona un proveedor:**
   - AWS, Google Cloud o Azure (cualquiera funciona)
5. **Selecciona una región:**
   - Elige la más cercana a ti (ejemplo: South America)
6. **Nombre del cluster:**
   - Puedes dejarlo como "Cluster0" o ponerle un nombre personalizado
7. **Click en "Create Deployment"**
8. **Espera 3-5 minutos** mientras se crea el cluster

## 📋 Paso 3: Configurar Seguridad (Database Access)

1. **Te aparecerá una pantalla** pidiendo crear un usuario
2. **Crea un usuario:**
   - **Username:** (elige uno, ejemplo: `upc_admin`)
   - **Password:** (crea una contraseña segura y **GUÁRDALA**)
   - **Database User Privileges:** Deja "Atlas admin" (por defecto)
3. **Click en "Create Database User"**
4. **Guarda la contraseña** en un lugar seguro

## 📋 Paso 4: Configurar Network Access (Acceso de Red)

1. **Te aparecerá otra pantalla** sobre Network Access
2. **Agrega tu IP:**
   - Opción 1: Click en "Add My Current IP Address" (solo tu IP)
   - Opción 2: Click en "Allow Access from Anywhere" y agrega `0.0.0.0/0` (recomendado para Vercel)
3. **Click en "Finish and Close"**

## 📋 Paso 5: Obtener la Cadena de Conexión

1. **En el dashboard de Atlas**, verás tu cluster
2. **Click en "Connect"** (botón verde)
3. **Selecciona "Connect your application"**
4. **Copia la cadena de conexión:**
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. **Reemplaza `<username>` y `<password>`:**
   - `<username>` → tu usuario (ejemplo: `upc_admin`)
   - `<password>` → tu contraseña (la que creaste)
   - **Ejemplo final:**
     ```
     mongodb+srv://upc_admin:MiPassword123@cluster0.xxxxx.mongodb.net/
     ```
6. **Guarda esta cadena** - la necesitarás para Vercel

## 📋 Paso 6: Importar tus Datos a MongoDB Atlas

### Opción A: Usando MongoDB Compass (Recomendado)

1. **Descarga MongoDB Compass:**
   - Ve a: https://www.mongodb.com/try/download/compass
   - Descarga e instala (es gratis)

2. **Conéctate a Atlas:**
   - Abre MongoDB Compass
   - Pega tu cadena de conexión completa (con usuario y contraseña)
   - Click en "Connect"

3. **Crea la base de datos:**
   - Click en "Create Database"
   - **Database Name:** `upc_certificados`
   - **Collection Name:** `certificados`
   - Click "Create Database"

4. **Importa los datos:**
   - Selecciona la colección `certificados`
   - Click en "ADD DATA" → "Import File"
   - Selecciona: `C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\data\certificados.json`
   - **Input File Type:** JSON Array
   - **Import Mode:** Insert documents
   - Click "Import"
   - Deberías ver: "Successfully imported 872 documents"

### Opción B: Usando mongoimport (Terminal)

```bash
# Reemplaza la cadena de conexión con la tuya
mongoimport --uri "mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/upc_certificados" --collection certificados --file "C:\Users\flore\Downloads\e-certs-upc-master\e-certs-upc-master\data\certificados.json" --jsonArray
```

## 📋 Paso 7: Verificar que los Datos Están Importados

1. **En MongoDB Compass:**
   - Ve a la base de datos `upc_certificados`
   - Abre la colección `certificados`
   - Deberías ver 872 documentos

2. **O en MongoDB Atlas:**
   - Click en "Browse Collections"
   - Deberías ver tus datos

## 📋 Paso 8: Configurar en Vercel

1. **Ve a tu proyecto en Vercel**
2. **Settings → Environment Variables**
3. **Agrega:**
   - **Name:** `MONGODB_URI`
   - **Value:** Tu cadena de conexión completa (ejemplo: `mongodb+srv://upc_admin:MiPassword123@cluster0.xxxxx.mongodb.net/`)
   - **Environments:** Selecciona TODOS (Production, Preview, Development)
4. **Save**
5. **Redespliega** el proyecto

## ✅ Checklist Final

- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster FREE creado
- [ ] Usuario de base de datos creado
- [ ] Network Access configurado (`0.0.0.0/0`)
- [ ] Cadena de conexión obtenida
- [ ] Base de datos `upc_certificados` creada
- [ ] Colección `certificados` creada
- [ ] 872 documentos importados
- [ ] Variable `MONGODB_URI` configurada en Vercel
- [ ] Proyecto redesplegado en Vercel

## 🎯 Resultado Final

Después de seguir estos pasos:
- ✅ MongoDB Atlas funcionando en la nube
- ✅ Datos importados y accesibles
- ✅ Vercel conectado a MongoDB Atlas
- ✅ Tu aplicación funcionando en producción

## 💡 Tips Importantes

- **Guarda tu contraseña** de MongoDB Atlas en un lugar seguro
- **Guarda tu cadena de conexión** completa
- El cluster FREE tiene límites pero es suficiente para empezar
- Puedes actualizar a un plan pago después si necesitas más recursos

## 🆘 Si Tienes Problemas

### Error: "Authentication failed"
- Verifica que el usuario y contraseña sean correctos
- Verifica que no haya espacios extra en la cadena de conexión

### Error: "Network access denied"
- Verifica que agregaste `0.0.0.0/0` en Network Access
- Espera unos minutos después de agregar la IP

### Error: "Database not found"
- Verifica que creaste la base de datos `upc_certificados`
- Verifica que la colección se llama `certificados`

¡Sigue estos pasos y tendrás MongoDB Atlas funcionando! 🚀

