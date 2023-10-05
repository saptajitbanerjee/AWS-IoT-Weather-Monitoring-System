#import time
import json
import boto3

Websocket_HTTPS_URL = "https://bc8p09eijf.execute-api.ap-south-1.amazonaws.com/production"
client = boto3.client("apigatewaymanagementapi", endpoint_url = Websocket_HTTPS_URL)
 
ssm_Client = boto3.client('ssm')


def lambda_handler(event, context):
    print(event) 
    response_ssm = ssm_Client.get_parameter(Name='connection_id')
    print("my stored connection id: ", response_ssm['Parameter']['Value'] )
    connectionId =  response_ssm['Parameter']['Value']  #dig into the response blob to get our string cvalue
    Test_Message = json.dumps({ "message": "Hello from lambda, hardcoded test message"})
    IoT_Message = json.dumps(event)
    
    #for i in range(6):
        #send_message(connection_id, test_message)
        #context.get_remaining_time_in_millis()  # Reset Lambda execution time to prevent timeouts
        #time.sleep(300)  # Sleep for  minutes before sending the next keep-alive message
        
    #AWS API Gateway API's require 'key=value' arguments
    #https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/apigatewaymanagementapi.html#ApiGatewayManagementApi.Client.post_to_connection
    response = client.post_to_connection(ConnectionId = connectionId, Data = IoT_Message)