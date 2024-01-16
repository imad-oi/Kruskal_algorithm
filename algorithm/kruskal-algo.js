function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Graph {
  constructor(vertices) {
    this.numVertices = vertices;
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

  kruskalMST(color = "blue") {
    const result = [];
    shuffleArray(this.edges);
    this.edges.sort((a, b) => a.weigth - b.weigth);

    const parent = [];
    const rank = [];

    for (let i = 0; i < this.numVertices; i++) {
      parent[i] = i;
      // parent[i] = this.vertices[i].id;
      rank[i] = 0;
    }

    let edgeIndex = 0;
    let resultIndex = 0;

    while (resultIndex < this.numVertices - 1 && edgeIndex < this.edges.length) {
      const edge = this.edges[edgeIndex++];

      const { source, target, weigth } = edge;
      const root1 = this.findRoot(parent, source);
      const root2 = this.findRoot(parent, target);

      if (root1 !== root2) {
        result[resultIndex++] = { source, target, weigth };
        edge.color = color;
        this.union(parent, rank, root1, root2);
      }
    }

    return this.edges;
  }
}

export default function kruskalAlgo(data, color = "blue") {
  const graph = new Graph(data.nodes.length);
  data.links.forEach(link => graph.addEdge(
    data.nodes.indexOf(data.nodes.find(n => n.id === link.source)),
    data.nodes.indexOf(data.nodes.find(n => n.id === link.target)),
    link.weigth
  ));

  return {
    nodes: data.nodes,
    links: graph.kruskalMST(color)
      .map(link => {
        const newLink = {
          source: data.nodes[parseInt(link.source)].id,
          target: data.nodes[parseInt(link.target)].id,
          weigth: link.weigth
        };
        if (link.color) {
          newLink.color = link.color;
        }
        return newLink;
      })
  };
}
