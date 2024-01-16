FROM python:3.9

WORKDIR /app

COPY . .

ENV EXTERNAL_DATA_PATH=../external_data
ENV INTERNAL_DATA_PATH=../internal_data

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--chdir", "src", "-w", "2", "-b", "0.0.0.0:8000", "--keyfile", "/certs/privkey1.pem", "--certfile", "/certs/fullchain1.pem", "main:app"]