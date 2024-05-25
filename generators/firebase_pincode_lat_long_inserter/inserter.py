import pandas as pd
from dotenv import load_dotenv
import os
 
data_df = pd.read_csv("./bangalore_pincode_lat_lon.csv", encoding="ISO-8859-1")
pincode_list = data_df['Pincode'].tolist()
latitude_list = data_df['Latitude'].tolist()
longitude_list = data_df['Longitude'].tolist()
for i in range(len(pincode_list)):
    pincode = int(pincode_list[i])
    latitude = latitude_list[i]
    longitude = longitude_list[i]
    print("UPDATE `refined-aria-413310.bob_the_builder.pin_codes_india`")
    print(f"SET latitude = {latitude}")
    print(f"where pin_code = {pincode};")
    
    print("UPDATE `refined-aria-413310.bob_the_builder.pin_codes_india`")
    print(f"SET longitude = {longitude}")
    print(f"where pin_code = {pincode};")
