FROM python:3.12-alpine3.20

ENV FLASK_APP=app.py \
    SERVICE=order-service

RUN addgroup -S python && adduser -S python -G python

WORKDIR /app

COPY requirerments.txt .

RUN pip install -r requirerments.txt

COPY app.py database.py models.py ./

USER python

ENTRYPOINT [ "flask", "run" ]
CMD [ "--host=0.0.0.0", "--port=5000"]
