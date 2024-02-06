#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;

// * 30k Pin codes
// * 10M Merchants

string gen_random_pincode(const int len = 6)
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
    // Pin code is a 6 digit number -> 9*10*10*10*10*10 = 900,000 pin codes possible
    ofstream pincodes("pincodes.csv");
    pincodes<<"index,pin_code\n";
    for (int i = 0; i < 30000; i++)
        pincodes << i << "," << gen_random_pincode() << "\n";
    pincodes.close();
}