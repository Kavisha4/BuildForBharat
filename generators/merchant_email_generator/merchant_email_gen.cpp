#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;

// * 30k Pin codes
// * 10M Merchants

string gen_random_name(const int len)
{
    static const char alphanum[] =
        "0123456789"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz";
    string tmp_s;
    tmp_s.reserve(len);
    for (int i = 0; i < len; ++i)
        tmp_s += alphanum[rand() % (sizeof(alphanum) - 1)];
    return tmp_s;
}

string gen_random_merchant_email(const int len = 26)
{
    string tmp_s;
    tmp_s += gen_random_name(26);
    tmp_s += "@mail.com";
    return tmp_s;
}

int main()
{
    srand((unsigned)time(NULL) * getpid());
    // Merchant id is a 10 digit number -> 9*10*10*10*10*10*10*10*10*10 = 9,000,000,000 Merchant ids possible
    ofstream merchant_ids("merchant_emails.csv");
    merchant_ids << "email\n";
    for (long i = 0; i < 10000000; i++)
        merchant_ids << gen_random_merchant_email() << "\n";
    merchant_ids.close();
}