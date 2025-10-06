# Dockerfile para Ta-Te-Ti BEMG
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente y archivos de configuración
COPY . .
# Asegurar que el archivo .env esté disponible
COPY .env .env

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar ownership de archivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto
EXPOSE 3009

# Comando de inicio
CMD ["node", "--experimental-vm-modules", "app/server.js"]