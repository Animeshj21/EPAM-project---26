#include <bits/stdc++.h>
using namespace std;

int main()
{
    int N, M, D;
    cin >> N >> M >> D;

    vector<vector<int>> adj(N + 1);

    // Build graph
    for(int i = 0; i < M; i++)
    {
        int u, v;
        cin >> u >> v;

        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Distance from City 1
    vector<int> dist(N + 1, -1);

    queue<int> q;

    // Start BFS from City 1
    dist[1] = 0;
    q.push(1);

    while(!q.empty())
    {
        int node = q.front();
        q.pop();

        for(int neighbour : adj[node])
        {
            // Not visited
            if(dist[neighbour] == -1)
            {
                dist[neighbour] = dist[node] + 1;
                q.push(neighbour);
            }
        }
    }

    // Count cities with distance <= D
    int ans = 0;

    for(int i = 1; i <= N; i++)
    {
        if(dist[i] != -1 && dist[i] <= D)
        {
            ans++;
        }
    }

    cout << ans << endl;

    return 0;
}