#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    long long B;

    cin >> N >> B;

    vector<int> a(N);

    for (int i = 0; i < N; i++) {
        cin >> a[i];
    }

    sort(a.begin(), a.end());

    long long total = 0;
    int count = 0;

    for (int i = 0; i < N; i++) {
        if (total + a[i] <= B) {
            total += a[i];
            count++;
        } else {
            break;
        }
    }

    cout << count << endl;

    return 0;
}