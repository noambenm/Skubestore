FROM python:3.12-alpine3.20

ENV FLASK_APP=app.py \
    SERVICE=user-service

RUN addgroup -S python && adduser -S python -G python

WORKDIR /app

COPY requirerments.txt .

RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

RUN pip install -r requirerments.txt

COPY app.py database.py models.py ./

USER python

ENTRYPOINT [ "flask", "run" ]
CMD [ "--host=0.0.0.0", "--port=5000"]
