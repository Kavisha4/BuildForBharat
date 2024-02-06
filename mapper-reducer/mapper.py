#!/usr/bin/env python
import sys

def join(items, separator=","):
    return separator.join(items)

current_pin_code = None
current_merchant_ids = []

for line in sys.stdin:
    pin_code, merchant_id, _ = line.strip().split('\t')

    if current_pin_code == pin_code:
        current_merchant_ids.append(merchant_id)
    else:
        if current_pin_code is not None:
            print(f"{current_pin_code}\t{join(current_merchant_ids)}")
        current_pin_code = pin_code
        current_merchant_ids = [merchant_id]

# Output the last pin code
if current_pin_code is not None:
    print(f"{current_pin_code}\t{join(current_merchant_ids)}")
