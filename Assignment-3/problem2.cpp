#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    cin >> N;

    vector<int> points(N);

    for (int i = 0; i < N; i++) {
        cin >> points[i];
    }

    vector<int> dp(N);

    dp[0] = points[0];

    if (N > 1)
        dp[1] = max(points[0], points[1]);

    for (int i = 2; i < N; i++) {
        dp[i] = max(dp[i - 1], points[i] + dp[i - 2]);
    }

    cout << dp[N - 1] << endl;

    return 0;
}