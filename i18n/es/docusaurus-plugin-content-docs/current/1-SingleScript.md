---
slug: /Script
---
# Instalación con un Solo Script

La forma más fácil de instalar phoenixd es usando nuestro script de instalación automatizado. Este script se encarga de la descarga, verificación y configuración de phoenixd en tu sistema Linux.

:::info
**Leer Antes de Instalar**

Por favor, lee esta página completa para entender qué hace el script de instalación, sus requisitos e implicaciones de seguridad antes de ejecutar cualquier comando. El script realizará cambios en el sistema y puede requerir permisos de sudo.
:::


## Instalación Rápida

Ejecuta el siguiente comando en tu terminal:

**Comando único (recomendado):**
```bash
curl -fsSL https://raw.githubusercontent.com/btcgdl/Mastering-phoenixd/master/scripts/install.sh | bash -s -- --yes
```

**Métodos alternativos:**

Si prefieres revisar el script antes de ejecutarlo, puedes descargarlo e inspeccionarlo manualmente primero:

*Descarga el script y hazlo ejecutable:*
   ```bash
   wget https://raw.githubusercontent.com/btcgdl/Mastering-phoenixd/master/scripts/install.sh
   chmod +x install.sh
   ```

*Ejecuta el script:*
   ```bash
   ./install.sh
   ```

## Qué Hace el Script

El script de instalación realiza las siguientes operaciones:

1. **Descarga phoenixd v0.7.0** de los lanzamientos oficiales de ACINQ en GitHub.
2. **Verifica la integridad del paquete** usando firmas GPG y checksums.
3. **Instala en un directorio en tu PATH** (por defecto: `/usr/local/bin`).
4. **Configura tu entorno de shell** para reconocer el comando `phoenixd`.
5. **Opcionalmente, configura un servicio de systemd** para el inicio automático.

## Proceso de Instalación

Cuando ejecutes el script, verás:

```
⚡️ Bienvenido al instalador de Mastering phoenixd
-----------------------------------------
Instalando phoenixd 0.7.0 desde github.com/ACINQ/phoenixd/releases/download/v0.7.0
```

### Verificación del Paquete

El script incluye verificación automática:

```
🔐 Iniciando la verificación del paquete...
✅ Verificación del paquete exitosa.
✅ Verificación exitosa. El paquete es auténtico e intacto.
```

Esto asegura que estás instalando una versión auténtica y no modificada de phoenixd.

### Configuración del Servicio Systemd

Después de la instalación, se te preguntará:

```
¿Quieres configurar un servicio de systemd (requiere permiso de sudo)? (y/n):
```

Si eliges **sí**:
- Crea un archivo de servicio de systemd en `/etc/systemd/system/phoenixd.service`.
- Habilita e inicia el servicio.
- Configura phoenixd para que se ejecute en mainnet por defecto.
- Configura el reinicio automático en caso de fallo.

Luego puedes gestionar phoenixd usando comandos de systemd:
```bash
sudo systemctl start phoenixd
sudo systemctl stop phoenixd
sudo systemctl restart phoenixd
sudo systemctl status phoenixd
journalctl -u phoenixd -f  # Ver registros
```

Si eliges **no**:
- Puedes ejecutar phoenixd manualmente con el comando `phoenixd`.
- Usa `phoenix-cli` para interactuar con el demonio.

## Post-Instalación

Después de una instalación exitosa:

### Operación Manual
```bash
# Iniciar phoenixd manualmente
phoenixd --agree-to-terms-of-service

# En otra terminal, interactuar con phoenixd
phoenix-cli getinfo
```

### Servicio Systemd (si está habilitado)
```bash
# Controlar el servicio
sudo systemctl start phoenixd
sudo systemctl stop phoenixd
sudo systemctl restart phoenixd

# Comprobar el estado del servicio
sudo systemctl status phoenixd

# Ver registros
journalctl -u phoenixd -f
```

## Requisitos

- **Sistema Operativo**: Linux (x64)
- **Dependencias**: `curl`, `unzip`, `sha256sum`
- **Red**: Conexión a internet para las descargas.
- **Permisos**: Acceso de escritura al directorio de instalación, sudo para el servicio de systemd.

## Solución de Problemas

### Comando no encontrado después de la instalación

Si el comando `phoenixd` no es reconocido después de la instalación:

```bash
# Recarga la configuración de tu shell
source ~/.bashrc  # o ~/.zshrc

# O reinicia tu terminal
```

### Fallos de verificación

Si la verificación del paquete falla:
- Comprueba tu conexión a internet.
- Asegúrate de que GPG esté instalado correctamente.
- Visita la [página oficial de lanzamientos](https://github.com/ACINQ/phoenixd/releases) para una verificación manual.

### Problemas de permisos

Si encuentras errores de permisos:
- Asegúrate de tener acceso de escritura al directorio de instalación.
- Usa `sudo` para instalaciones a nivel de sistema.
- Considera usar el directorio `~/.local/bin`.

## Notas de Seguridad

El script de instalación:
- ✅ Descarga solo de fuentes oficiales de ACINQ.
- ✅ Verifica los paquetes usando firmas GPG.
- ✅ Valida los checksums antes de la instalación.
- ✅ Usa conexiones HTTPS seguras.
- ✅ Proporciona total transparencia de las operaciones.

Siempre revisa los scripts antes de ejecutarlos con privilegios elevados.

## Próximos Pasos

Después de la instalación, consulta:
- [Guía de Instalación](./2-Install.md) para una configuración detallada.
- [Configuración](./3-Config.md) para opciones de inicio.
- [Documentación de la API](./5-API.md) para detalles de integración.
