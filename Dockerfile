FROM jfloff/alpine-python:3.6-slim AS build
ADD . /app
WORKDIR /app

RUN echo "manylinux1_compatible = True" >> /usr/lib/python3.6/_manylinux.py && \
    apk add --no-cache --update build-base python3-dev musl-dev libffi-dev openssl-dev && \
    python -m pip install --upgrade pip wheel cryptography && \
    python -m pip install -r requirements.txt && \
    python -m pip install -r requirements_dev.txt && \
    rm -rf /var/cache/apk/*
RUN pip wheel --wheel-dir=/root/blockchain-etl-wheel blockchain-etl
RUN pip wheel --wheel-dir=/root/flask-wheel flask
RUN pip wheel --wheel-dir=/root/flask-cors-wheel flask-cors

FROM jfloff/alpine-python:3.6-slim AS small
COPY gunicorn.conf /app/gunicorn.conf
COPY --from=build /app/flask_modules ./
COPY --from=build /root/blockchain-etl-wheel /root/blockchain-etl-wheel
COPY --from=build /root/flask-wheel /root/flask-wheel
COPY --from=build /root/flask-cors-wheel /root/flask-cors-wheel
COPY --from=build /usr/lib/python3.6/_manylinux.py /usr/lib/python3.6/_manylinux.py
RUN apk add --no-cache --update openssl-dev && \
    python -m pip install --no-index --find-links=/root/blockchain-etl-wheel blockchain-etl && \
    python -m pip install --no-index --find-links=/root/flask-wheel flask && \
    python -m pip install --no-index --find-links=/root/flask-cors-wheel flask-cors && \
    python -m pip install gunicorn && \
    rm -rf /root/blockchain-etl-wheel /root/flask-wheel /root/flask-cors-wheel /root/z3-wheel
EXPOSE 8080
CMD ["gunicorn", "--config", "/app/gunicorn.conf", "app.wsgi:app"]
