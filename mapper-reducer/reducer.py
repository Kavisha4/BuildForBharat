#!/usr/bin/env python
import sys

def join(items, separator=","):
    return separator.join(items)

current_pin_code = None
current_merchant_ids = []

for line in sys.stdin:
    pin_code, merchant_ids = line.strip().split('\t', 1)

    if current_pin_code == pin_code:
        current_merchant_ids.extend(merchant_ids.split(','))
    else:
        if current_pin_code is not None:
            print(f"{current_pin_code}\t{join(current_merchant_ids)}")
        current_pin_code = pin_code
        current_merchant_ids = merchant_ids.split(',')

# Output the last pin code
if current_pin_code is not None:
    print(f"{current_pin_code}\t{join(current_merchant_ids)}")
