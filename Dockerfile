FROM python:3.9

WORKDIR /app

COPY . .
# TODO: montar los certificados en el contenedor usando volúmenes
# COPY /etc/letsencrypt/live/hodie.cafe/privkey.pem .
# COPY /etc/letsencrypt/live/hodie.cafe/fullchain.pem .

# Instalar dependencias
# TODO: requirements.txt
RUN pip install Flask
RUN pip install requests
RUN pip install bs4
RUN pip install lxml
RUN pip install gunicorn

EXPOSE 8000

CMD ["gunicorn", "--chdir", "src", "-w", "2", "-b", "0.0.0.0:8000", "--keyfile", "/certs/privkey.pem", "--certfile", "/certs/fullchain.pem", "main:app"]
# CMD ["gunicorn", "--chdir", "src", "-w", "2", "-b", "0.0.0.0:8000", "--keyfile", "privkey.pem", "--certfile", "fullchain.pem", "main:app"]

# Esto es para ejecutar el dockerfile con flask en modo desarrollo:

# ENV FLASK_APP=src/main.py
# ENV FLASK_RUN_HOST=0.0.0.0
# ENV FLASK_ENV=production

# EXPOSE 5000

# CMD ["flask", "run"]