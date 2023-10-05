import boto3
import datetime
from zoneinfo import ZoneInfo
#format = "%d/%m/%Y %H:%M:%S"

def lambda_handler(event, context):
    date=datetime.datetime.now(tz=ZoneInfo('Asia/Kolkata'))
    date=str(date.year)+"-"+str(date.month)+"-"+str(date.day)+" "+str(date.hour)+":"+str(date.minute)+":"+str(date.second)
    client = boto3.client('dynamodb')
    response = client.put_item(
        TableName = 'ESP32_Data',
        Item = {
            'date': {'S': date},
            'temperature': {'N': str(event['temperature'])},
            'humidity': {'N': str(event['humidity'])},
            'pressure': {'N': str(event['pressure'])},
            'altitude': {'N': str(event['altitude'])},
        }
    )
