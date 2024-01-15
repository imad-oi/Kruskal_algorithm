class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.edges = [];
    }

    addEdge(source, target, width) {
        this.edges.push({ source, target, width });
    }

    findRoot(parent, vertex) {
        if (parent[vertex] === vertex) return vertex;
        return this.findRoot(parent, parent[vertex]);
    }

    union(parent, rank, root1, root2) {
        if (rank[root1] < rank[root2]) {
            parent[root1] = root2;
        } else if (rank[root1] > rank[root2]) {
            parent[root2] = root1;
        } else {
            parent[root2] = root1;
            rank[root1]++;
        }
    }

    kruskalMST(color ="blue") {
        const result = [];
        this.edges.sort((a, b) => a.width - b.width);

        const parent = [];
        const rank = [];

        for (let i = 0; i < this.numVertices; i++) {
            parent[i] = i;
            rank[i] = 0;
        }

        let edgeIndex = 0;
        let resultIndex = 0;

        while (resultIndex < this.numVertices - 1) {
            const edge = this.edges[edgeIndex++];

            const { source, target, width } = edge;
            const root1 = this.findRoot(parent, source);
            const root2 = this.findRoot(parent, target);

            if (root1 !== root2) {
                result[resultIndex++] = { source, target, width };
                edge.color = color
                this.union(parent, rank, root1, root2);
            }
        }

        return this.edges;
    }
}
/*

// Example usage:
const numVertices = 4;
const graph = new Graph(numVertices);

// Adding edges (source, target, width)
graph.addEdge(0, 1, 10);
graph.addEdge(0, 2, 6);
graph.addEdge(0, 3, 5);
graph.addEdge(1, 3, 15);
graph.addEdge(2, 3, 4);

const minimumSpanningTree = graph.kruskalMST();
console.log("Minimum Spanning Tree:", minimumSpanningTree);
*/

export default function kruskalAlgo(data, color = "blue") {
    const graph = new Graph(data.nodes.length);
    data.links.forEach(link => graph.addEdge(link.source, link.target, link.width))
    return {
        nodes: data.nodes,
        links: graph.kruskalMST(color)
    }
}
