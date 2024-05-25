import pandas as pd
import random
 
pincodes_df = pd.read_csv("./pincodes.csv", encoding="ISO-8859-1")
list_of_pincodes = pincodes_df['pin_code'].tolist()
emails_df = pd.read_csv("./merchant_emails.csv", encoding="ISO-8859-1")
list_of_emails = emails_df['email'].tolist()

def gen_random_sparse_matrix_df(rows, cols):
    pincode_array = []
    email_array = []
    sparse_factor = 100
    cnt = 0
    for i in range(rows):
        for j in range(cols):
            rand_int = random.randint(0, 32767)
            if rand_int % sparse_factor == 0:
                pincode_array.append(list_of_pincodes[i])
                email_array.append(list_of_emails[j])
            else:
                cnt += 1
    print(f"Sparsity: {(cnt * 1.0) / (rows * cols * 1.0)}")
    return pd.DataFrame({'pin_code': pincode_array, 'email': email_array})

random_sparse_matrix_df = gen_random_sparse_matrix_df(19252, 10000000)
random_sparse_matrix_df.to_csv('pincodes_email_map.csv', columns=['pin_code','email'],index=False)