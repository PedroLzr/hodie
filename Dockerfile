FROM python:3.9

WORKDIR /app

# Copiar los archivos del directorio actual al contenedor
COPY . .

# Instalar dependencias
RUN pip install Flask
RUN pip install requests
RUN pip install bs4
RUN pip install lxml

# Definir variables de entorno
ENV FLASK_APP=src/index.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["flask", "run"]
