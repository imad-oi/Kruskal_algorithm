class Graph {
    constructor(numVertices) {
        this.numVertices = numVertices;
        this.edges = [];
    }

    addEdge(source, target, weigth) {
        this.edges.push({ source, target, weigth });
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
        this.edges.sort((a, b) => a.weigth - b.weigth);

        const parent = [];
        const rank = [];

        for (let i = 0; i <= this.numVertices; i++) {
            parent[i] = i;
            rank[i] = 0;
        }

        let edgeIndex = 0;
        let resultIndex = 0;

        while (resultIndex < this.numVertices) {
            console.log(edgeIndex)
            console.log(this.edges)
            const edge = this.edges[edgeIndex++];
            console.log(edge)
            console.log("-------------------------------")

            const { source, target, weigth } = edge;
            const root1 = this.findRoot(parent, source);
            const root2 = this.findRoot(parent, target);

            if (root1 !== root2) {
                result[resultIndex++] = { source, target, weigth };
                edge.color = color
                this.union(parent, rank, root1, root2);
            }
        }

        return this.edges;
    }
}

export default function kruskalAlgo(data, color = "blue") {
    const graph = new Graph(data.nodes.length - 1);
    data.links.forEach(link => graph.addEdge(link.source, link.target, link.weigth))
    return {
        nodes: data.nodes,
        links: graph.kruskalMST(color)
    }
}
