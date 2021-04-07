from flask_cors import CORS
from flask import Flask, request, send_from_directory
from werkzeug.utils import secure_filename
from astar import bacaTextFile, listOfNode, coordinates, matrixJarak, tetangga, closestPath
import os

server = Flask(__name__)
CORS(server)


@server.route("/")
def index():
    return send_from_directory(os.path.join("static", "html"), "index.html")


@server.route("/read-file", methods=["POST"])
def read_file():
    f = request.files["file"]
    f.save(os.path.join("uploads", secure_filename(f.filename)))

    arr = bacaTextFile(os.path.join("uploads", secure_filename(f.filename)))

    nodeArr = listOfNode(arr)
    neighArr = tetangga(arr, nodeArr)
    coordArr = coordinates(arr)
    distMatr = matrixJarak(arr, coordArr)

    nodeArrDict = []
    for index, node in enumerate(nodeArr):
        nodeName = node[0]
        nodeDict = {
            "name": nodeName,
            "title": nodeName,
            "position": {
                "lng": float(coordArr[index][1]),
                "lat": float(coordArr[index][0]),
            }
        }
        nodeArrDict.append(nodeDict)

    neighArrDict = []
    for index, neighbor in enumerate(neighArr):
        neighDict = {
            "rel": list(neighbor),
            "distance": float(distMatr[nodeArr.index(neighbor[0])][nodeArr.index(neighbor[1])])
        }
        neighArrDict.append(neighDict)

    return {"nodes": nodeArrDict, "neighbors": neighArrDict}


@server.route("/get-path", methods=["POST"])
def get_path():
    req = request.json
    arr = bacaTextFile(os.path.join("uploads", req["filename"]))
    nodeArr = listOfNode(arr)
    neighArr = tetangga(arr, nodeArr)
    coordArr = coordinates(arr)
    distMatr = matrixJarak(arr, coordArr)
    path = closestPath(req["source"], req["destination"],
                       neighArr, distMatr, nodeArr)

    retval = []
    for p in path:
        retval.append({
            "node": p[0],
            "cost": p[1]
        })

    return {"paths": retval}
