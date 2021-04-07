from astar import bacaTextFile, listOfNode, tetangga, coordinates, jarak, matrixJarak, getNeighbour, getIdx, sortingFn, closestPath, getMinFn, derivate
from web import server
import sys

#apabila hanya menjalankan 'python main.py' pada terminal, maka akan dijalankan main python standar
if len(sys.argv) == 1: 
    filename = str(input("Masukkan nama file : "))
    fileDir = "../test/" + x
    arr = bacaTextFile(fileDir)
    # ['A', 'B', 'C', 'D', ...] A,B,C,D,... adalah node
    listNode = listOfNode(arr)
    # [('A', 'B'), ('A', 'C'), ...] B tetangga A, C tetangga A
    arrNeigh = tetangga(arr, listNode)
    # [['1', '2'], ['2', '1'], ['1','1'], ...] elmt pertama adalah latitude, dan kedua adalah longitude
    loc = coordinates(arr)
    matrixDistance = matrixJarak(arr, loc)
    # 0 2 1
    # 2 0 2
    # 1 2 0
    src = str(input("Masukkan node awal : "))  # A
    dest = str(input("Masukkan node tujuan : "))  # G
    # [('A', 0), ('B', 20.62), ('G', 159.84)], elmt kedua dari tuple dalam satuan meter
    jalan = closestPath(src, dest, arrNeigh, matrixDistance, listNode)
    print(jalan)

# apabila pada terminal 'dijalankan python main.py gui' maka akan menjalankan GUI berupa
# web lokal yang telah dibuat
else:
    if sys.argv[1] == "gui":
        server.run(port=5000, debug=True)

    else:
        print("Invalid command, either run \"python3 main.py web\" or \"python3 main.py\"")
