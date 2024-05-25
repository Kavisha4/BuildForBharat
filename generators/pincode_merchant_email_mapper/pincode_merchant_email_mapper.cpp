#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;

// * 30k Pin codes -> rows
// * 10M Merchants -> cols

void gen_random_sparse_matrix(const long long rows = 19252, const long long cols = 10000000)
{
    ofstream sparse_matrix("pincode_merchant_map_19252_10000000.csv");
    ifstream pincodes("./pincodes.csv");
    ifstream emails("./merchant_emails.csv");
    vector<string> pincode_array, email_array;
    string inp;
    while (getline(pincodes, inp))
    {
        if (inp == "pin_code")
            continue;
        pincode_array.push_back(inp);
    }
    while (getline(emails, inp))
    {
        if (inp == "email")
            continue;
        email_array.push_back(inp);
    }
    long long sparse_factor = 100; // The greater, the more sparse -> 1 (0), 2(0.50), 3 (0.66), 4 (0.75), 5 (0.80), 10 (0.89), 100 (0.99)
    long long cnt = 0;
    sparse_matrix << "pin_code,email\n";
    for (long long r = 0; r < rows; r++)
    {
        for (long long c = 0; c < cols; c++)
        {
            if (rand() % sparse_factor == 0)
                sparse_matrix << pincode_array[r] << "," << email_array[c] << "\n";
            else
                cnt++;
        }
    }
    cout << "Sparsity: " << (cnt * 1.0) / (rows * cols * 1.0) << "\n";
    sparse_matrix.close();
    pincodes.close();
    emails.close();
}

int main()
{
    time_t start, end;
    time(&start);
    ios_base::sync_with_stdio(false);
    srand((unsigned)time(NULL) * getpid());
    gen_random_sparse_matrix();
    time(&end);
    double time_taken = double(end - start);
    cout << "Time taken to generate sparse matrix : " << fixed
         << time_taken << setprecision(5) << " sec " << endl;
}