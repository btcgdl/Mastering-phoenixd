---
slug: /Install
---

# Instalar `phoenixd`

(Consulta la [documentación de Phoenix](https://phoenix.acinq.co/server) para más detalles.)  

## 1. Descargar y Configurar `phoenixd`  

Descarga y extrae la última versión:  

```sh
wget https://github.com/ACINQ/phoenixd/releases/download/v0.7.0/phoenixd-0.7.0-linux-x64.zip
unzip -j phoenixd-0.7.0-linux-x64.zip
```  

Mueve los binarios a una ruta global:  

```sh
sudo mv phoenixd /usr/local/bin/
sudo mv phoenix-cli /usr/local/bin/
```  

Elimina el archivo zip
```sh
rm phoenixd-0.7.0-linux-x64.zip
```

## 2. Crear un Archivo de Servicio de Systemd  

Crea un nuevo archivo de servicio de systemd:  

```sh
sudo nano /etc/systemd/system/phoenixd.service
```  

Añade el siguiente contenido (reemplaza `tu_usuario` con tu nombre de usuario real):  

```ini
[Unit]
Description=Demonio de Phoenix
After=network.target

[Service]
ExecStart=phoenixd
User=tu_usuario
Restart=always
RestartSec=5
LimitNOFILE=4096
WorkingDirectory=/home/tu_usuario/

[Install]
WantedBy=multi-user.target
```  

## 3. Recargar Systemd y Habilitar el Servicio  

```sh
sudo systemctl daemon-reload
sudo systemctl enable phoenixd
```  

## 4. Iniciar el Servicio  

```sh
sudo systemctl start phoenixd
```  

## 5. Comprobar el Estado del Servicio  

```sh
sudo systemctl status phoenixd
```