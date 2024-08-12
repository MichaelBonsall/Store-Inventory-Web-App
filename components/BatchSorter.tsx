
import StoreLayout from "./Layout"
import {Item} from './iItem'

//nothing in this file is tested

/**
Finds the distances of all provided paths.

@param graph adjacency list representation of store layout
@param paths A list of pathways in the graph

@returns a list of paths, with the last element being the distance traveled in that path
*/

function dijkstrasShortestPath(graph: number[][], paths: number[][]): number[][] {

    paths.forEach((path) => {
        path.reverse();
        let distance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const u = path[i];
            const v = path[i + 1];
            distance += graph[u][v];
        }
        path.push(distance);
    });
    return paths;
}

        
/**
Finds all possible paths in the graph. This should only be ran once and cached for maximum efficiency

Args:
    @param graph adjacency list representation of store layout
    @param min_len the minimum length of the returned paths. Default is 3.
    @param path: used in recursion. Leave empty
*/  
function allPaths(graph: number[][], minLen: number = 3, path: number[] = []): number[][] {
    let results: number[][] = [];

    if (path.length === 0) {
        for (let source = 0; source < graph.length; source++) {
            results = results.concat(allPaths(graph, minLen, [source]));
        }
    } else {
        if (path.length >= minLen) results.push(path);
        const current = path[path.length - 1];
        for (let nextNode = 0; nextNode < graph.length; nextNode++) {
            if (path.includes(nextNode)) continue; // don't want to visit a node twice
            if (graph[current][nextNode] !== 0) {
                results = results.concat(allPaths(graph, minLen, path.concat(nextNode)));
            }
        }
    }

    return results;
}

/** 
Finds the optimal path to take for a list of shelves

@param shelves: the list of shelves needed to visit

@returns The optimal path to take to visit all shelves in the least distance
*/

function findOptimalPath(shelves: number[]): number[] {
    const shelvesFixed: number[] = shelves.map(shelf => shelf - 1).sort((a, b) => a - b);

    let minDistance = Number.MAX_SAFE_INTEGER;
    let optimalPath: number[] | null = null;

    const shortestPathsList: number[][] = dijkstrasShortestPath(StoreLayout, allPaths(StoreLayout));

    for (const path of shortestPathsList) {
        const distance = path[path.length - 1];
        path.pop(); 
        let validPath = true;

        for (const shelf of shelvesFixed) {
            if (!path.includes(shelf)) {
                validPath = false;
                break;
            }
        }

        if (validPath && distance < minDistance) {
            optimalPath = path;
            minDistance = distance;
        }
    }

    return optimalPath || [];
}


/** 
Sorts the batch into the most efficient path for running it
@param batch a batch to  be sorted
@returns A sorted batch
*/
export function sortBatch(batch: Item[]): Item[] {
    const shelvesNeeded: string[] = [];

    batch.forEach(item => {
        console.log(item)
        const shelf = item.shelf_location.slice(2);
        if (!shelvesNeeded.includes(shelf)) {
            shelvesNeeded.push(shelf);
        }
    });

    let sortedBatch: Item[] = [];
    if (shelvesNeeded.length < 3) {
        sortedBatch = batch.slice().sort((a, b) => a.shelf_location.localeCompare(b.shelf_location));
    } else {
        const path: number[] = findOptimalPath(shelvesNeeded.map(shelf => parseInt(shelf, 10)));
        path.forEach(shelf => {
            let currentShelf = batch.filter(item => parseInt(item.shelf_location.slice(2), 10) - 1 === shelf);
            currentShelf = currentShelf.sort((a, b) => a.shelf_location.localeCompare(b.shelf_location));
            sortedBatch = sortedBatch.concat(currentShelf);
        });
    }

    return sortedBatch;
}

