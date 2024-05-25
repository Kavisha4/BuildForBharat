import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()
gcp_api_key = os.getenv("GCP_API_KEY")
 
email_df = pd.read_csv("./merchant_emails.csv", encoding="ISO-8859-1")
email_list = email_df['email'].tolist()
for email in email_list:
    password = "" # You will never know
    curlCommand = f'curl \'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={gcp_api_key}\' -H \'Content-Type: application/json\' --data-binary \'' + '{"email":' + f'"{email}","password":"{password}","returnSecureToken":true' + '}\''
    os.system(curlCommand)