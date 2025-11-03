# Desinstalar `phoenixd`  

:::danger
Este tutorial **no** elimina el directorio `.phoenix/`.  
Este directorio contiene tu archivo `seed.dat`.  
**Si se elimina, todos tus fondos se perderán permanentemente.** Procede con precaución.  
:::


Para eliminar completamente `phoenixd` de tu sistema, sigue estos pasos:  

## 1. Detener y Deshabilitar el Servicio  

```sh
sudo systemctl stop phoenixd
sudo systemctl disable phoenixd
```

## 2. Eliminar el Archivo de Servicio de Systemd

```sh
sudo rm -v /etc/systemd/system/phoenixd.service
```

## 3. Recargar Systemd

```sh
sudo systemctl daemon-reload
sudo systemctl reset-failed
```

## 4. Eliminar los Binarios de `phoenixd`

```sh
sudo rm -v /usr/local/bin/phoenix*
```

## 5. Verificar que el Servicio se ha Eliminado (Opcional)

```sh
systemctl list-units --type=service | grep phoenixd
```

Después de estos pasos, `phoenixd` se habrá eliminado completamente de tu sistema.