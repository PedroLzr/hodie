# Usamos una imagen oficial de Python como base
FROM python:3.9

# Definimos la carpeta de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos del directorio actual al contenedor
COPY . .

# Instalamos las dependencias
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Definimos la variable de entorno para indicar que Flask debe correr en modo producción
ENV FLASK_APP=src/index.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# Exponemos el puerto 5000 que es donde Flask corre por defecto
EXPOSE 5000

# Definimos el comando para correr la aplicación
CMD ["flask", "run"]
