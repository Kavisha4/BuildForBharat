#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;

// * 30k Pin codes
// * 10M Merchants

string gen_random_merchant_id(const int len = 10)
{
    static const char num[] = "0123456789";
    string tmp_s;
    tmp_s.reserve(len);
    for (int i = 0; i < len; ++i)
    {
        char ch = num[rand() % (sizeof(num) - 1)];
        if (i == 0)
            while (ch == '0')
                ch = num[rand() % (sizeof(num) - 1)];
        tmp_s += ch;
    }
    return tmp_s;
}

int main()
{
    srand((unsigned)time(NULL) * getpid());
    // Merchant id is a 10 digit number -> 9*10*10*10*10*10*10*10*10*10 = 9,000,000,000 Merchant ids possible
    ofstream merchant_ids("merchant_ids.csv");
    merchant_ids<<"index,merchant_id\n";
    for (long i = 0; i < 10000000; i++)
        merchant_ids << i << "," << gen_random_merchant_id() << "\n";
    merchant_ids.close();
}