export function dijkstra(grid, startNode, finishNode) {
    const visitedNodeInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while(!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodeInOrder;
        closestNode.isVisited = true;
        visitedNodeInOrder.push(closestNode);
        if(closestNode === finishNode) return visitedNodeInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbours(node, grid);
    for(const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbours(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if(row > 0) neighbors.push(grid[row - 1][col]);
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if(col > 0) neighbors.push(grid[row][col - 1]);
    if(col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for(const row of grid) {
        for(const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null) {
        console.log(`Current Node: ${currentNode.row}, ${currentNode.col}, Previous Node: ${currentNode.previousNode ? `${currentNode.previousNode.row}, ${currentNode.previousNode.col}` : 'null'}`);
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}