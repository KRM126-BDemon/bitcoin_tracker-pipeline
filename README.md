# Bitcoin Global Adoption Tracker

<<<<<<< HEAD
## Project Overview
This project establishes a fully automated, and serverless data pipeline on AWS to track and ingest daily cryptocurrency data (specifically Bitcoin price data from several countries) from a public API.
=======
## Project Description
A tutorial/portfolio project, a web application that tracks Bitcoin prices and premium trends across multiple countries to analyze adoption patterns in regions with currency instability.
>>>>>>> e79441c (Update project with all files and documentation)

**Live Demo:** [https://btc-global-prices-keith.s3.us-west-1.amazonaws.com/index.html]

Being a new student of cloud tech, I used Google Gemini to help me understand the architecture process, provide JSON code, and troubleshoot as needed.

---

## Motivation
This project was built to explore Bitcoin adoption patterns in countries experiencing currency instability (Argentina, Turkey, Nigeria). My hypothesis was that Bitcoin would trade at premiums in these countries, indicating strong local demand. The project also served as a learning opportunity to develop hands-on experience with AWS cloud services and data visualization.

---

## Features
- Real-time Bitcoin price tracking in USD, Argentine Peso, Turkish Lira, and Nigerian Naira
- Premium/discount calculation comparing actual market prices to fair exchange rates
- Historical price trend visualization
- Multi-country premium comparison charts
- Automated data updates every 12 hours
- Responsive web design

---

## Technologies Used

**Frontend:**
- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js for data visualization

**Backend:**
- Python 3.12 (AWS Lambda)
- CoinGecko API for cryptocurrency data

**Cloud Infrastructure:**
- AWS S3 (static website hosting and data storage)
- AWS Lambda (serverless data fetching)
- AWS EventBridge Scheduler (automated triggers)
- IAM (permissions management)

**LLM**
- Anthropic Claude and Google Gemini were assisted in code creation and cloud architecture and debugging.
---

## Architecture

### System Flow
1. EventBridge Scheduler triggers Lambda function every 12 hours
2. Lambda fetches Bitcoin prices and exchange rates from CoinGecko API
3. Data is processed and stored as JSON in S3
4. Static website hosted on S3 fetches and visualizes the data
5. Chart.js renders interactive price and premium trend charts

### Architecture Diagram
[Add your architecture diagram image here]

<<<<<<< HEAD
```markdown
![CloudWatch Log Success](images/cloudwatch_success_screenshot.png)
=======
---

## Setup Instructions

### Prerequisites
- AWS Account
- CoinGecko API key (free tier)
- Basic knowledge of AWS services

### Steps

1. **Clone the repository**
```bash
   git clone [your-repo-url]
   cd bitcoin-adoption-tracker
```

2. **Set up S3 Bucket**
   - Create S3 bucket with static website hosting enabled
   - Update bucket policy for public read access
   - Upload `index.html`, `script.js`, and `style.css`

3. **Create Lambda Function**
   - Runtime: Python 3.12
   - Upload `lambda_function.py`
   - Add environment variables:
     - `API_KEY`: Your CoinGecko API key
     - `BUCKET_NAME`: Your S3 bucket name
   - Set timeout to 30 seconds
   - Attach IAM role with S3 write permissions

4. **Configure EventBridge Scheduler**
   - Create schedule with 12-hour rate expression
   - Target: Your Lambda function
   - Create execution role with Lambda invoke permissions

5. **Update Configuration**
   - In `script.js`, update the S3 bucket URLs to match your bucket name

---

## Key Learnings

**AWS Services:**
- Gained hands-on experience with S3 static website hosting
- Implemented serverless architecture with Lambda functions
- Configured automated scheduling with EventBridge
- Managed permissions with IAM roles and policies

**Technical Skills:**
- API integration and data processing
- Time-series data visualization with Chart.js
- Asynchronous JavaScript and fetch API
- JSON data manipulation and storage

**Challenges Overcome:**
- Resolved CORS and mixed content issues with S3 URLs
- Implemented historical data appending in Lambda
- Debugged browser caching issues
- Optimized chart rendering for multiple data points

---

## Future Enhancements

- Add CloudFront CDN for improved global performance and HTTPS
- Implement custom domain with Route 53
- Store API keys securely in AWS Secrets Manager
- Add CloudWatch alarms for monitoring Lambda failures
- Expand to include more countries and currencies
- Add data export functionality (CSV download)
- Implement user-configurable date ranges for charts
- Add mobile-responsive design improvements

---

## Cost Analysis

**Monthly AWS Costs:** ~$1-2

**Breakdown:**
- S3 Storage: <$0.50 (minimal data storage)
- S3 Requests: <$0.10 (low traffic)
- Lambda Execution: Free tier (60 executions/month)
- EventBridge Scheduler: Free tier
- Data Transfer: <$1 (minimal bandwidth)

---

## License
MIT License

---

## Acknowledgments
- CoinGecko API for cryptocurrency data
- AWS for cloud infrastructure
- Chart.js for visualization library
>>>>>>> e79441c (Update project with all files and documentation)
