#include <iostream>
#include <vector>
#include <algorithm>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;

// * 30k Pin codes -> rows
// * 10M Merchants -> cols

void gen_random_sparse_matrix(const long long rows = 30000, const long long cols = 10000000)
{
    ofstream sparse_matrix("sparse_matrix.txt");
    long long sparse_factor = 100; // The greater, the more sparse -> 1 (0), 2(0.50), 3 (0.66), 4 (0.75), 5 (0.80), 10 (0.89), 100 (0.99)
    long long cnt = 0;
    for (long long r = 0; r < rows; r++)
    {
        for (long long c = 0; c < cols; c++)
        {
            if (rand() % sparse_factor == 0)
                sparse_matrix << to_string(c) << " ";
            else
                cnt++;
        }
        sparse_matrix << "\n";
    }
    cout << "Sparsity: " << (cnt * 1.0) / (rows * cols * 1.0) << "\n";
    sparse_matrix.close();
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