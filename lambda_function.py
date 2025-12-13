import json
import boto3
import urllib.request
from datetime import datetime

# --- Configuration ---
# 1. REPLACE THIS with the name of the S3 bucket you created in Step A.
S3_BUCKET_NAME = "bitcoin-tracker-raw-data-keithmoore"
# 2. API Endpoint for fetching BTC prices in multiple currencieshttps://us-west-1.console.aws.amazon.com/s3/home?region=us-west-1
API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,jpy,gbp,cad"
# 3. Initialize the S3 Client
s3 = boto3.client('s3')


def lambda_handler(event, context):
    try:
        # 1. FETCH DATA FROM EXTERNAL API
        # Send an HTTP GET request to the CoinGecko API
        response = urllib.request.urlopen(API_URL)
        data = json.loads(response.read().decode())

        # Add a precise timestamp (crucial for data integrity and partitioning)
        now_utc = datetime.utcnow()
        data['timestamp'] = now_utc.isoformat()

        # Prepare the JSON data for S3
        json_data = json.dumps(data)

        # 2. DEFINE S3 PATH (KEY) FOR DATA LAKE PARTITIONING
        # Use a YYYY/MM/DD/timestamp format to enable efficient querying later (Partitioning!)
        key_path = f"year={now_utc.year}/month={now_utc.month:02d}/day={now_utc.day:02d}/{now_utc.strftime('%H%M%S')}.json"

        # 3. UPLOAD DATA TO S3
        s3.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=key_path,
            Body=json_data,
            ContentType='application/json'
        )

        print(
            f"Successfully uploaded data to s3://{S3_BUCKET_NAME}/{key_path}")

        return {
            'statusCode': 200,
            'body': json.dumps('Data collected and uploaded successfully')
        }

    except Exception as e:
        print(f"Error during execution: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps(f'Error processing request: {str(e)}')
        }
