#include <bits/stdc++.h>
using namespace std;

int n;
long long K;
vector<long long> value;
vector<vector<int>> adj;

int ans = 0;

void dfs(int node, int parent, long long pathXor)
{
    // XOR from root to current node
    pathXor = pathXor ^ value[node];

    // Check whether current node is trusted
    if (pathXor >= K)
        ans++;

    // Visit children
    for (int child : adj[node])
    {
        if (child != parent)
        {
            dfs(child, node, pathXor);
        }
    }
}

int main()
{
    cin >> n >> K;

    value.resize(n + 1);
    adj.resize(n + 1);

    // Node values
    for (int i = 1; i <= n; i++)
    {
        cin >> value[i];
    }

    // Tree edges
    for (int i = 0; i < n - 1; i++)
    {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Start DFS from root = 1
    dfs(1, 0, 0);

    cout << ans << endl;

    return 0;
}