FROM python:3

WORKDIR /app

COPY . .
COPY requirements.txt .

# Install mysqlclient
RUN pip install mysqlclient

# Make port 8080 available to the world outside this container
EXPOSE 8080

RUN pip install -r requirements.txt

ENV FLASK_APP=server.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]