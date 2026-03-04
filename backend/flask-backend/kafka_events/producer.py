import json
import logging
from kafka import KafkaProducer
from kafka.errors import KafkaError
import os


# config

KAFKA_BROKER=os.getenv("KAFKA_BROKER","localhost:9092")
KAFKA_TOPIC=os.getenv("KAFKA_TOPIC","report_events")


# create producer (Singleton pattern)

producer = None

def get_producer():

    global producer

    if producer is None:
        try:
            producer = KafkaProducer(
                bootstrap_servers=KAFKA_BROKER,
                value_serializer=lambda v: json.dumps(v).encode("utf-8"),
                retries=5,
                acks="all",
                linger_ms=5
            )
            print("Kafka producer Connected")
        except Exception as e:
            logging.error("Kafka Connection Failed : %s",str(e))
            producer = None

    return producer



# Publish Event 

def publish_event(event_payload):
    try:

        kafka_producer = get_producer();

        if not kafka_producer:
            raise Exception("Kafka producer not Initialized")
        
        future = kafka_producer.send(KAFKA_TOPIC,event_payload)
        record_metadata = future.get(timeout=10)

        print(f" Event Sent to kafka |  Topic : {record_metadata.topic}")
    
    except KafkaError as ke:
        logging.error("Kafka Publish error %s",str(ke))
    
    except Exception as e:

        logging.error("Unexpected Kafka error : %s",str(e))
