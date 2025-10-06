# 🚀 Guía de Despliegue - Ta-Te-Ti BEMG

## Configuración Inicial

### 1. Instalar Dependencias

```bash
# Instalar todas las dependencias (incluyendo devDependencies)
npm install

# Instalar hooks de Git
npm run prepare
```

### 2. Verificar Configuración

```bash
# Ejecutar linting
npm run lint

# Ejecutar pruebas
npm run test

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Despliegue en Vercel

### Opción 1: Despliegue Automático (Recomendado)

#### Configuración de GitHub Secrets

1. Ve a tu repositorio en GitHub
2. Navega a Settings > Secrets and variables > Actions
3. Agrega los siguientes secrets:

```
VERCEL_TOKEN=tu_token_de_vercel
ORG_ID=tu_org_id_de_vercel
PROJECT_ID=tu_project_id_de_vercel
```

#### Obtener Credenciales de Vercel

1. **VERCEL_TOKEN**:
   - Ve a Vercel Dashboard
   - Settings > Tokens
   - Create Token
   - Copia el token generado

2. **ORG_ID y PROJECT_ID**:
   - Ve a tu proyecto en Vercel
   - Settings > General
   - Copia el Organization ID y Project ID

#### Proceso de Despliegue

1. Haz push a la rama `main` o `master`
2. GitHub Actions ejecutará automáticamente:
   - Linting
   - Pruebas unitarias
   - Pruebas de integración
   - Cobertura de código
3. Si todo pasa, se desplegará automáticamente a Vercel

### Opción 2: Despliegue Manual

#### Instalar Vercel CLI

```bash
npm install -g vercel
```

#### Configurar Variables de Entorno

```bash
# Crear archivo .env.local para Vercel
vercel env add NODE_ENV
vercel env add PORT
vercel env add API_VERSION
vercel env add API_PREFIX
vercel env add LOG_LEVEL
```

#### Desplegar

```bash
# Desplegar a producción
vercel --prod

# O desplegar a preview
vercel
```

## Configuración de Variables de Entorno

### Variables Requeridas

```bash
NODE_ENV=production
PORT=3009
API_VERSION=v1
API_PREFIX=/api
LOG_LEVEL=info
```

### Variables de Cobertura (Opcional)

```bash
COVERAGE_THRESHOLD_STATEMENTS=88
COVERAGE_THRESHOLD_BRANCHES=77
COVERAGE_THRESHOLD_FUNCTIONS=90
COVERAGE_THRESHOLD_LINES=89
```

## Verificación del Despliegue

### 1. Verificar API

```bash
# Test básico
curl "https://tu-app.vercel.app/move?board=[0,1,0,2,0,0,0,0,0]"

# Respuesta esperada
{"movimiento": 4}
```

### 2. Verificar Logs

```bash
# Ver logs en Vercel Dashboard
# O usar Vercel CLI
vercel logs
```

### 3. Verificar Health Check

```bash
# El endpoint raíz debería responder
curl "https://tu-app.vercel.app/"
```

## Troubleshooting

### Problemas Comunes

#### 1. Error de Linting en CI/CD

```bash
# Ejecutar localmente para ver errores
npm run lint

# Corregir automáticamente
npm run lint:fix
```

#### 2. Error de Pruebas

```bash
# Ejecutar pruebas localmente
npm run test

# Ver cobertura detallada
npm run test:coverage
```

#### 3. Error de Despliegue en Vercel

- Verificar que `vercel.json` esté configurado correctamente
- Verificar que las variables de entorno estén configuradas
- Verificar que el puerto esté configurado como 3009

#### 4. Error de Variables de Entorno

```bash
# Verificar variables en Vercel
vercel env ls

# Agregar variable faltante
vercel env add VARIABLE_NAME
```

## Monitoreo y Mantenimiento

### 1. Logs de Aplicación

- Los logs se pueden ver en Vercel Dashboard
- Usar `vercel logs` para logs en tiempo real

### 2. Métricas de Rendimiento

- Vercel proporciona métricas automáticas
- Monitorear tiempo de respuesta de la API

### 3. Actualizaciones

- Los cambios se despliegan automáticamente al hacer push
- Para rollback, usar Vercel Dashboard > Deployments

## Configuración Avanzada

### 1. Dominio Personalizado

1. Ve a Vercel Dashboard > Settings > Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones

### 2. Variables de Entorno por Entorno

```bash
# Desarrollo
vercel env add NODE_ENV development

# Producción
vercel env add NODE_ENV production
```

### 3. Configuración de CORS (si es necesario)

```javascript
// En server.js, agregar si es necesario
app.use(
  cors({
    origin: ['https://tu-dominio.com'],
    credentials: true
  })
)
```

## Comandos Útiles

```bash
# Desarrollo local
npm start

# Pruebas
npm test
npm run test:coverage

# Linting
npm run lint
npm run lint:fix

# Formateo
npm run format
npm run format:check

# Vercel
vercel login
vercel
vercel --prod
vercel logs
vercel env ls
vercel env add VARIABLE_NAME
```

## Estructura de Archivos de Despliegue

```
├── .github/workflows/ci-cd.yml    # Pipeline de CI/CD
├── vercel.json                    # Configuración de Vercel
├── .eslintrc.js                   # Configuración de ESLint
├── .prettierrc                    # Configuración de Prettier
├── .husky/                        # Git hooks
│   ├── pre-commit
│   └── pre-push
├── .env                          # Variables de entorno (incluido en repo)
└── DEPLOYMENT.md                 # Esta guía
```

---

**¡Tu aplicación Ta-Te-Ti BEMG está lista para producción! 🎉**
