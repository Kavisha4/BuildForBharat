import pandas as pd
 
df = pd.read_csv("./govt_india_pincode.csv", encoding="ISO-8859-1")
df.rename(columns = {'Pincode':'pin_code'}, inplace = True)
df.to_csv('pincodes.csv', columns=['pin_code'],index=False)