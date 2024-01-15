FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--chdir", "src", "-w", "2", "-b", "0.0.0.0:8000", "--keyfile", "/certs/privkey1.pem", "--certfile", "/certs/fullchain1.pem", "main:app"]

## Dev:
# ENV FLASK_APP=src/main.py
# ENV FLASK_RUN_HOST=0.0.0.0
# ENV FLASK_ENV=production
# EXPOSE 5000
# CMD ["flask", "run"]