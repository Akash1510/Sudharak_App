import redis
import json

redis_client = redis.Redis(
    host='redis-10362.c326.us-east-1-3.ec2.cloud.redislabs.com',
    port=10362,
    db=0,
    decode_responses=True,
    password='d2Os6yFL48CT7nEKnn5z0gHXZFtKNgbS'
)


def set_temp_report(token,data,ttl=1800):
    """
    store Temporary report data in redis with 
    a time to live (TTL) in seconds.
    """

    redis_client.setex(f"Report_Token:{token}",ttl,json.dumps(data))


def get_temp_report(token):

    """
    retrieve Temporary report data from redis using token

    """

    data = redis_client.get(f"Report_Token:{token}")
    return json.loads(data) if data else None

def delete_temp_report(token):
    redis_client.delete(f"Report_Token:{token}")


