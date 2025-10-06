# 🎮 Ta-Te-Ti BEMG - Algoritmos Inteligentes

## 📋 Descripción del Proyecto - Grupo BEMG

Este proyecto implementa algoritmos inteligentes para el juego Ta-Te-Ti (Tres en Raya) en dos variantes:

- **Tablero 3x3**: Algoritmo clásico con estrategias optimizadas
- **Tablero 5x5**: Algoritmo avanzado con múltiples combinaciones ganadoras

El sistema utiliza **programación funcional** e **inyección de dependencias** para crear algoritmos altamente testables y mantenibles.

## 🚀 Inicio Rápido con Docker

### Prerrequisitos

- Docker instalado en tu sistema
- Puerto 3009 disponible

### Ejecución con Docker

#### Opción 1: Script Automatizado (Recomendado)

```bash
# Ejecutar el script de construcción y ejecución
./docker-run.sh
```

#### Opción 2: Comandos Manuales

```bash
# 1. Construir la imagen Docker
docker build -t ta-te-ti-bemg .

# 2. Ejecutar el contenedor
docker run -d -p 3009:3009 --name ta-te-ti-server ta-te-ti-bemg

# 3. Verificar que el servidor esté funcionando
curl http://localhost:3009/move?board=[0,1,0,2,0,0,0,0,0]
```

### Comandos de Gestión del Contenedor

```bash
# Ver logs del servidor
docker logs ta-te-ti-server

# Detener el servidor
docker stop ta-te-ti-server

# Eliminar el contenedor
docker rm ta-te-ti-server

# Reiniciar el contenedor
docker restart ta-te-ti-server
```

## 🏗️ Estructura del Proyecto

```
ta-te-ti-bemg/
├── app/                          # Código fuente principal
│   ├── server.js                 # Servidor Express con API REST
│   ├── algoritmo.tres.core.js    # Algoritmo 3x3 refactorizado con base unificada
│   ├── algoritmo.tres.di.js      # Algoritmo 3x3 con inyección de dependencias
│   ├── algoritmo.cinco.core.js   # Algoritmo 5x5 refactorizado con base unificada
│   ├── algoritmo.cinco.di.js     # Algoritmo 5x5 con inyección de dependencias
│   ├── algoritmo-base.js         # Funciones base compartidas entre algoritmos
│   ├── strategies/               # Módulos de estrategia específicos
│   │   ├── tres-strategies.js    # Estrategias específicas para 3x3
│   │   └── cinco-strategies.js   # Estrategias específicas para 5x5
│   └── config.js                 # Configuración centralizada
├── __tests__/                    # Suite de pruebas completa
│   ├── unit/                     # Pruebas unitarias organizadas
│   │   ├── algorithms/           # Pruebas de algoritmos
│   │   ├── config/               # Pruebas de configuración
│   │   ├── strategies/           # Pruebas de estrategias específicas
│   │   ├── algorithm-base-edge-cases.unit.test.js    # Casos edge de funciones base
│   │   ├── algorithm-core-edge-cases.unit.test.js    # Casos edge de algoritmos core
│   │   ├── algorithm-di-edge-cases.unit.test.js      # Casos edge de algoritmos DI
│   │   └── edge-cases.unit.test.js                   # Casos edge generales
│   ├── integration/              # Pruebas de integración
│   │   ├── api.integration.test.js                   # Pruebas de API REST
│   │   ├── game-flow.integration.test.js             # Pruebas de flujo de juego
│   │   ├── server.integration.test.js                # Pruebas de servidor
│   │   └── server-advanced.integration.test.js       # Pruebas avanzadas de servidor
│   └── old_tests/                # Pruebas legacy (excluidas de Jest)
├── coverage/                     # Reportes de cobertura de código
├── Dockerfile                    # Configuración de contenedor Docker
├── jest.config.js                # Configuración de Jest
└── package.json                  # Dependencias y scripts
```

## 🧠 Lógica de los Algoritmos

### Algoritmo 3x3 (Tres en Raya Clásico)

#### Estrategias Implementadas:

1. **Movimiento Inicial**: Ocupar el centro (posición 4)
2. **Detección de Victoria**: Buscar combinaciones ganadoras en filas, columnas y diagonales
3. **Bloqueo Defensivo**: Prevenir victoria del oponente
4. **Estrategia Posicional**: Priorizar centro → esquinas → bordes

#### Combinaciones Ganadoras:

```javascript
const COMBINACIONES_GANADOR = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Filas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columnas
  [0, 4, 8],
  [2, 4, 6] // Diagonales
]
```

### Algoritmo 5x5 (Tres en Raya Avanzado)

#### Características Avanzadas:

1. **Múltiples Combinaciones**: 48 combinaciones ganadoras diferentes
2. **Estrategias Específicas**:
   - Bloqueo diagonal opuesto
   - Bloqueo de fila/columna
   - Estrategia posicional adaptativa
3. **Configuración Centralizada**: Tablero, símbolos y combinaciones en `config.js`

#### Combinaciones Ganadoras (5x5):

- **Filas**: 15 combinaciones (3 por fila)
- **Columnas**: 15 combinaciones (3 por columna)
- **Diagonales Principales**: 6 combinaciones
- **Diagonales Menores**: 12 combinaciones adicionales

### Arquitectura de Inyección de Dependencias

#### Funciones Base Compartidas (algoritmo-base.js):

```javascript
// Utilidades fundamentales
determinePlayerSymbols(emptyCount)
evaluateWinningMove(board, position, symbol, winningCombinations)
findImmediateWin(board, emptyPositions, symbol, winningCombinations)
findImmediateBlock(board, emptyPositions, opponentSymbol, winningCombinations)
findStrategicCompletion(board, emptyPositions, symbol, winningCombinations)
selectPositionalMove(emptyPositions, config)
getOpponentPositions(board, opponentSymbol)
verifyWinner(board, symbol, winningCombinations)
getBoardSize(boardLength)
getRowColumn(position, boardSize)
getPosition(row, column, boardSize)
```

#### Estrategias Específicas por Tablero:

**3x3 (tres-strategies.js):**

```javascript
handleOpponentInCorner(opponentPos, emptyPositions)
handleOpponentInCenter(emptyPositions)
handleOpponentInEdge(opponentPos, emptyPositions, boardSize)
getStrategicMove(opponentPos, emptyPositions)
```

**5x5 (cinco-strategies.js):**

```javascript
handleOpponentInCorner5x5(opponentPos, emptyPositions)
handleOpponentInCenter5x5(emptyPositions)
handleOpponentInEdge5x5(opponentPos, emptyPositions, boardSize)
getStrategicMove5x5(opponentPos, emptyPositions)
```

#### Funciones Legacy (strategy.js):

```javascript
// Estrategias básicas (mantenidas para compatibilidad)
verificarGanador(board, symbol, winningCombinations)
buscarMovimientoGanador(board, emptyPositions, symbol, combinations)
buscarMovimientoCompletar(board, emptyPositions, symbol, combinations)
estrategiaPosicional(emptyPositions, config)
estrategiaBloqueoDiagonal(opponentPosition, emptyPositions, diagonalOpposites)
estrategiaBloqueoFilaColumna(opponentPosition, emptyPositions, boardSize)
obtenerPosicionesOponente(board, opponentSymbol)
determinarSimbolos(emptyCount)
```

#### Configuración Centralizada:

```javascript
export const BOARD_CONFIGS = {
  TRES: { size: 9, center: 4, corners: [0,2,6,8], ... },
  CINCO: { size: 25, center: 12, corners: [0,4,20,24], ... }
};

export const SYMBOLS = {
  EMPTY: 0,
  X: 1,
  O: 2
};
```

## 🧪 Configuración de Pruebas y Cobertura

### Configuración de Jest

El proyecto utiliza Jest con configuración optimizada para módulos ES6 y cobertura profesional:

```javascript
// jest.config.js
export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/__tests__/**/*.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/old_tests/',
    '/coverage/',
    '!/__tests__/unit/coverage/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  transform: {},
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 77,
      functions: 90,
      lines: 89,
      statements: 88
    }
  },
  testTimeout: 10000,
  verbose: true
}
```

### Scripts de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm test -- --coverage

# Ejecutar pruebas específicas
npm test -- --testNamePattern="algoritmo tres"
npm test -- --testPathPatterns="unit/algorithms"

# Ejecutar solo pruebas unitarias
npm test -- --testPathPatterns="unit/"

# Ejecutar solo pruebas de integración
npm test -- --testPathPatterns="integration/"

# Ejecutar pruebas con modo verbose
npm test -- --verbose
```

### Tipos de Pruebas Implementadas

#### 1. Pruebas Unitarias (22 suites, 404 pruebas)

- **Algoritmos Core**: Pruebas de algoritmos refactorizados con base unificada
- **Algoritmos DI**: Pruebas de algoritmos con inyección de dependencias
- **Estrategias**: Pruebas de funciones puras individuales y específicas por tablero
- **Configuración**: Pruebas de configuración centralizada
- **Funciones Base**: Pruebas de utilidades compartidas entre algoritmos
- **Casos Edge**: Pruebas exhaustivas de casos límite y escenarios complejos
- **Inyección de Dependencias**: Pruebas con mocks y dependencias personalizadas

#### 2. Pruebas de Integración (4 suites, 25 pruebas)

- **API REST**: Pruebas de endpoints del servidor con validación completa
- **Flujo de Juego**: Pruebas de integración completa de partidas
- **Servidor**: Pruebas de configuración, arranque y manejo de errores
- **Servidor Avanzado**: Pruebas de rendimiento y casos edge del servidor

#### 3. Pruebas de Cobertura Especializadas

- **Cobertura Base**: Pruebas específicas para funciones base compartidas
- **Cobertura Core**: Pruebas dirigidas a algoritmos refactorizados
- **Cobertura DI**: Pruebas específicas para algoritmos con inyección de dependencias
- **Casos Edge Avanzados**: Pruebas exhaustivas de escenarios complejos

### Métricas de Cobertura Actuales

#### 🎯 Cobertura Global del Sistema:

- **Statements**: 92.48% (394/426) ✅
- **Branches**: 86.59% (252/291) ✅
- **Functions**: 98.63% (72/73) ✅
- **Lines**: 92.38% (376/407) ✅

#### 📊 Cobertura por Módulos:

**Funciones Base (algoritmo-base.js):**

- **Statements**: 100% ✅
- **Branches**: 100% ✅
- **Functions**: 100% ✅
- **Lines**: 100% ✅

**Configuración (config.js):**

- **Cobertura**: 100% ✅

**Estrategias (strategy.js):**

- **Statements**: 98%
- **Branches**: 96.87%
- **Functions**: 100%
- **Lines**: 97.77%

**Estrategias Específicas (strategies/):**

- **Statements**: 96.96%
- **Branches**: 91.3%
- **Functions**: 100%
- **Lines**: 96.77%

**Algoritmos Core Refactorizados:**

- **algoritmo.tres.core.js**: 88.88% statements
- **algoritmo.cinco.core.js**: 91.66% statements
- **algoritmo.tres.di.js**: 91.66% statements
- **algoritmo.cinco.di.js**: 84.53% statements

**Servidor (server.js):**

- **Statements**: 94%
- **Branches**: 90.9%
- **Functions**: 87.5%
- **Lines**: 93.87%

### Estructura de Pruebas

```
__tests__/
├── unit/                               # Pruebas Unitarias (22 suites)
│   ├── algorithms/                     # Algoritmos principales
│   │   ├── tres.unit.test.js           # Algoritmo 3x3 original
│   │   ├── tres-refactored.unit.test.js # Algoritmo 3x3 con DI
│   │   ├── cinco.unit.test.js          # Algoritmo 5x5 original
│   │   ├── cinco-refactored.unit.test.js # Algoritmo 5x5 con DI
│   │   ├── algoritmo-tres-core.unit.test.js # Algoritmo 3x3 core
│   │   ├── algoritmo-cinco-core.unit.test.js # Algoritmo 5x5 core
│   │   ├── tres-core-comprehensive.unit.test.js # Cobertura completa 3x3
│   │   ├── cinco-core-comprehensive.unit.test.js # Cobertura completa 5x5
│   │   └── cinco-di-comprehensive.unit.test.js # Cobertura completa 5x5 DI
│   ├── config/
│   │   └── config.unit.test.js         # Pruebas de configuración
│   ├── strategies/                     # Estrategias específicas
│   │   ├── tres-strategies.unit.test.js # Estrategias 3x3
│   │   └── cinco-strategies.unit.test.js # Estrategias 5x5
│   ├── server/
│   │   └── server.unit.test.js         # Pruebas unitarias del servidor
│   ├── algorithm-base-edge-cases.unit.test.js    # Casos edge funciones base
│   ├── algorithm-core-edge-cases.unit.test.js    # Casos edge algoritmos core
│   ├── algorithm-di-edge-cases.unit.test.js      # Casos edge algoritmos DI
│   ├── edge-cases.unit.test.js                   # Casos edge generales
│   └── strategy.unit.test.js           # Estrategias puras (legacy)
├── integration/                        # Pruebas de Integración (4 suites)
│   ├── api.integration.test.js         # Pruebas de API REST
│   ├── game-flow.integration.test.js   # Pruebas de flujo de juego
│   ├── server.integration.test.js      # Pruebas básicas del servidor
│   └── server-advanced.integration.test.js # Pruebas avanzadas del servidor
└── old_tests/                          # Pruebas legacy (excluidas de Jest)
```

## 🔧 API REST

### Endpoint Principal

**GET** `/move?board=[array]`

#### Parámetros:

- `board`: Array JSON con el estado del tablero
  - `0`: Posición vacía
  - `1`: Jugador X
  - `2`: Jugador O

#### Ejemplos de Uso:

##### Tablero 3x3:

```bash
curl "http://localhost:3009/move?board=[0,1,0,2,0,0,0,0,0]"
# Respuesta: {"movimiento": 4}
```

##### Tablero 5x5:

```bash
curl "http://localhost:3009/move?board=[0,1,0,2,0,0,0,0,0,0,1,0,2,0,0,0,0,0,0,1,0,2,0,0,0]"
# Respuesta: {"movimiento": 12}
```

#### Códigos de Respuesta:

- **200**: Movimiento calculado exitosamente
- **400**: Error en parámetros (tablero inválido, sin movimientos disponibles)

## 🐳 Configuración Docker

### Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs
EXPOSE 3009
CMD ["node", "--experimental-vm-modules", "app/server.js"]
```

### Características de Seguridad:

- Usuario no-root para ejecución
- Imagen Alpine Linux (ligera)
- Solo dependencias de producción
- Puerto expuesto correctamente

## 📊 Beneficios del Refactoring y Arquitectura Mejorada

### 1. **Arquitectura Unificada con Base Compartida**

- **Funciones base reutilizables** entre algoritmos 3x3 y 5x5
- **Estrategias específicas** por tipo de tablero
- **Código DRY** (Don't Repeat Yourself) implementado
- **Mantenibilidad mejorada** con separación clara de responsabilidades

### 2. **Inyección de Dependencias Avanzada**

- **Configuración inyectable** para testing y personalización
- **Funciones mockeables** para pruebas unitarias aisladas
- **Mayor flexibilidad** en pruebas y adaptación
- **Testabilidad completa** de todos los componentes

### 3. **Funciones Puras y Modulares**

- **Testabilidad individual** de cada función
- **Reutilización** entre algoritmos y estrategias
- **Predictibilidad** de resultados garantizada
- **Debugging simplificado** con funciones atómicas

### 4. **Cobertura de Pruebas Profesional**

- **404 pruebas unitarias** distribuidas en 22 suites
- **25 pruebas de integración** en 4 suites
- **92.48% de cobertura** de statements
- **98.63% de cobertura** de funciones
- **Casos edge exhaustivos** cubiertos

### 5. **Organización de Código Profesional**

- **Estructura modular** clara y escalable
- **Separación de responsabilidades** bien definida
- **Configuración centralizada** en un solo lugar
- **Estrategias específicas** por tipo de tablero
- **Documentación integrada** con JSDoc

### 6. **Calidad de Código Empresarial**

- **Código limpio** siguiendo mejores prácticas
- **Arquitectura escalable** para futuras mejoras
- **Testing exhaustivo** con casos edge cubiertos
- **Mantenibilidad** a largo plazo garantizada

## 🚀 CI/CD y Despliegue Automatizado

### Configuración de Linting y Formateo

El proyecto incluye herramientas de calidad de código:

```bash
# Instalar dependencias de desarrollo
npm install

# Ejecutar linting
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix

# Verificar formato de código
npm run format:check

# Formatear código automáticamente
npm run format
```

### Git Hooks con Husky

Se configuraron hooks de Git para mantener la calidad del código:

- **Pre-commit**: Ejecuta linting y pruebas básicas
- **Pre-push**: Ejecuta linting y pruebas con cobertura

```bash
# Instalar hooks de Git
npm run prepare

# Los hooks se ejecutan automáticamente en cada commit/push
```

### GitHub Actions CI/CD

El proyecto incluye un pipeline completo de CI/CD:

#### Características del Pipeline:

- **Testing en múltiples versiones de Node.js** (18.x, 20.x)
- **Linting automático** con ESLint
- **Formateo de código** con Prettier
- **Pruebas unitarias e integración**
- **Cobertura de código** con umbrales configurables
- **Despliegue automático a Vercel** en ramas main/master

#### Archivos de Configuración:

- `.github/workflows/ci-cd.yml` - Pipeline de CI/CD
- `vercel.json` - Configuración de Vercel
- `.eslintrc.js` - Configuración de ESLint
- `.prettierrc` - Configuración de Prettier

### Despliegue en Vercel

#### Configuración Requerida:

1. **Variables de Entorno en Vercel:**
   - `NODE_ENV=production`
   - `PORT=3009`
   - `API_VERSION=v1`
   - `API_PREFIX=/api`
   - `LOG_LEVEL=info`

2. **Secrets de GitHub (para CI/CD):**
   - `VERCEL_TOKEN` - Token de Vercel
   - `ORG_ID` - ID de la organización en Vercel
   - `PROJECT_ID` - ID del proyecto en Vercel

#### Proceso de Despliegue:

1. Push a rama `main` o `master`
2. GitHub Actions ejecuta tests y linting
3. Si todo pasa, despliega automáticamente a Vercel
4. La aplicación estará disponible en la URL de Vercel

### Variables de Entorno

El proyecto utiliza variables de entorno para configuración:

```bash
# .env (incluido en el repositorio para estudio universitario)
PORT=3009
NODE_ENV=development
API_VERSION=v1
API_PREFIX=/api
LOG_LEVEL=info
COVERAGE_THRESHOLD_STATEMENTS=88
COVERAGE_THRESHOLD_BRANCHES=77
COVERAGE_THRESHOLD_FUNCTIONS=90
COVERAGE_THRESHOLD_LINES=89
```

**Nota**: Para proyectos de producción, las variables sensibles deben configurarse en Vercel Dashboard.

## 🚀 Próximos Pasos

### Mejoras de Cobertura (Opcional):

1. **Cobertura 100%**: Cubrir las líneas restantes en algoritmos específicos
2. **Pruebas de rendimiento**: Implementar benchmarks de algoritmos
3. **Pruebas de carga**: Validar comportamiento bajo alta concurrencia

### Mejoras de Funcionalidad:

1. **Algoritmo de dificultad variable**: Implementar niveles de dificultad
2. **Análisis de patrones**: Añadir análisis estadístico de partidas
3. **Interfaz web**: Crear visualización interactiva del juego
4. **API GraphQL**: Implementar endpoint GraphQL para consultas complejas
5. **Métricas avanzadas**: Añadir telemetría y monitoreo

### Mejoras de Arquitectura:

1. **Microservicios**: Separar algoritmos en servicios independientes
2. **Cache distribuido**: Implementar Redis para optimización
3. **Base de datos**: Persistir estadísticas de partidas
4. **Monitoreo**: Implementar logging avanzado y métricas

## 📝 Notas de Desarrollo

### Arquitectura y Patrones:

- **Paradigma**: Programación Funcional con Inyección de Dependencias
- **Patrón**: Strategy Pattern para estrategias específicas por tablero
- **Principio**: DRY (Don't Repeat Yourself) con funciones base compartidas
- **Separación**: Responsabilidades claramente definidas por módulo

### Testing y Calidad:

- **Framework**: Jest con configuración optimizada para ES6
- **Cobertura**: 92.48% statements, 98.63% functions
- **Pruebas**: 429 pruebas totales (404 unitarias + 25 integración)
- **Estrategia**: Testing exhaustivo con casos edge cubiertos

### Infraestructura:

- **Contenedores**: Docker con seguridad optimizada (usuario no-root)
- **API**: RESTful con validación completa de parámetros
- **Configuración**: Centralizada y inyectable
- **Documentación**: Código autodocumentado con JSDoc

### Métricas de Calidad:

- **Mantenibilidad**: Alta (código modular y bien documentado)
- **Testabilidad**: Excelente (funciones puras y DI)
- **Escalabilidad**: Buena (arquitectura preparada para crecimiento)
- **Rendimiento**: Optimizado (algoritmos eficientes)

---

**Desarrollado con ❤️ para demostrar algoritmos inteligentes de Ta-Te-Ti con arquitectura profesional**
