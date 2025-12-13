# ₿ Bitcoin Price Tracker: Serverless Data Ingestion Pipeline

## Project Overview
This project establishes a robust, fully automated, and serverless data pipeline on Amazon Web Services (AWS) to track and ingest daily cryptocurrency data (specifically Bitcoin) from a public API.

It serves as a foundation for a complete **Extract, Transform, Load (ETL)** process, demonstrating expertise in cloud infrastructure setup, automated scheduling, data ingestion, and scalable data storage.

---

## 1. 🛠️ Technology Stack

| Service/Tool | Purpose |
| :--- | :--- |
| **AWS Lambda** | Core compute environment for running Python data ingestion code. |
| **AWS EventBridge** | Schedules the Lambda function to run daily at a specified time (9:00 AM PST). |
| **AWS S3 (Raw Layer)**| Highly durable and scalable storage for raw, un-transformed JSON data. |
| **Python 3.11+** | Primary language for scripting the API extraction and S3 loading logic. |
| **CoinGecko API** | External source for real-time cryptocurrency data. |

## 2. 🏗️ Architecture (Phase I: Ingestion)

The data pipeline adheres to a best-practice, serverless architecture model. This design ensures high availability, scalability, and minimal operational overhead.



### Data Flow Narrative:

1.  **Scheduled Trigger:** An Amazon EventBridge rule invokes the Lambda function daily at **9:00 AM PST** (`cron(0 17 * * ? *)`).
2.  **Extraction:** The Python code within the Lambda function uses the `requests` library to connect to the CoinGecko API and pull the latest Bitcoin data.
3.  **Partitioning & Loading:** The raw JSON data is immediately loaded into the S3 Raw Data Layer. The file path uses a **Hive-style partitioning** scheme for query optimization:
    `s3://bitcoin-tracker-raw-data-[YOUR_NAME]/year=YYYY/month=MM/day=DD/timestamp.json`
4.  **Verification:** CloudWatch Logs confirm the successful API call and S3 upload, completing the daily ingestion cycle.

## 3. ✅ Verification of Successful Ingestion

A key deliverable of this phase is confirming successful, automated data delivery to S3.

| Proof Point | Status | Description |
| :--- | :--- | :--- |
| **Lambda Execution** | Success | Confirmed via synchronous test using EventBridge payload simulation. |
| **Code Confirmation** | Success | CloudWatch logs contain the expected confirmation line: `Successfully uploaded data to s3://...` |
| **S3 Data Check** | Success | Verified that new files containing valid Bitcoin price data are present in the S3 bucket. |

*(Include screenshot of the successful log line in the CloudWatch Log Stream here, sourced from the `\images` folder.)*

```markdown
![CloudWatch Log Success](images/cloudwatch_success_screenshot.png)