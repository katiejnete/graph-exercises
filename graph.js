class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray) {
      this.nodes.add(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      if (node.adjacent === vertex) this.removeEdge(vertex, node);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisitStack = [start];
    const seen = new Set();

    while(toVisitStack.length) {
      const currNode = toVisitStack.pop();

      if (!seen.has(currNode)) {
        seen.add(currNode);

        for(let adjNode of currNode.adjacent) {
          if (!seen.has(adjNode)) {
            toVisitStack.push(adjNode);
          }
        }
      }
    }
    return [...seen].map(node => node.value);
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const seen = new Set();

    while(toVisitQueue.length) {
      const currNode = toVisitQueue.shift();

      if (!seen.has(currNode)) {
        seen.add(currNode);

        for(let adjNode of currNode.adjacent) {
          if (!seen.has(adjNode)) {
            toVisitQueue.push(adjNode);
          }
        }
      }
    }
    return [...seen].map(node => node.value);
  }
}

module.exports = { Graph, Node };
