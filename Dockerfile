FROM python:3.9

WORKDIR /app

COPY . .

ENV EXTERNAL_DATA_CULTURE_PATH=../external_data/culture
ENV EXTERNAL_DATA_ECONOMY_PATH=../external_data/economy
ENV INTERNAL_DATA_PATH=../internal_data

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--chdir", "src", "-w", "2", "-b", "0.0.0.0:8000", "--keyfile", "/certs/privkey.pem", "--certfile", "/certs/fullchain.pem", "main:app"]