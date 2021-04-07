from math import radians, cos, sin, asin, sqrt
# Membaca text dari file, mengembalikan multi dimentional array persis seperti file.txt
def bacaTextFile(x):
    f = open(x,'r') 
    file = f.readlines()
    operand = []
    #melakukan replace beberapa character seperti koma, titik, dan newline
    for lines in file:
        lines = lines.replace("\n"," ")
        operand.append(lines)
    opfinal = []
    for lines in operand:
        lines = lines.split()
        opfinal.append(lines)
    return opfinal

### Membaca multidimensional array dari file yang dibaca, mengembalikan listofnode ###
def listOfNode(x):
    starting = int(x[0][0])
    node = []
    for i in range(1,starting+1):
        node.append(x[i][0]) #append list node dari array input
    return node

# Membuat dan mengembalikan array berbentuk list of tupple, 
# yang berisi tupple ketetanggaan atau edges dari graph
def tetangga(x,listnode): 
    matrix = []
    starting = int(x[0][0])
    for i in range(starting + 1, len(x)):
        for j in range(len(x[starting + 1])):
            if(int(x[i][j]) > 0): 
                #append edge node pada matrix yang bertetangga apabila bernilai 1
                matrix.append((listnode[i-(starting+1)],listnode[j]))
    return matrix

# Membuat list of list of location dari masing2 node #
def coordinates(x):
    matrix =[]
    temp = []
    starting = int(x[0][0])
    for i in range(1, starting+1):
        temp.append(x[i][1])
    for loc in temp:
        loc = loc.replace('(',' ')
        loc = loc.replace(')',' ')
        loc = loc.replace(',',' ')
        matrix.append(loc)
    loc = []
    for lines in matrix :
        lines = lines.split()
        loc.append(lines)
    return loc

# Membaca elemen dari list of list of location, mengembalikan jarak dengan metode haversine #
def jarak(latitudeA, longitudeA, latitudeB, longitudeB):
    longitudeA, latitudeA, longitudeB, latitudeB = map(radians, [longitudeA, latitudeA, longitudeB, latitudeB])
    dlon = longitudeB - longitudeA
    dlat = latitudeB - latitudeA
    a = sin(dlat/2)**2 + cos(latitudeA) * cos(latitudeB) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 * (1000) 
    dist = round(c*r, 3)
    return dist

# Membaca array pada bagian matrix ketetanggan, kemudian membuat matrix bobot yang berisikan 
# jarak yang dihitung dengan metode haversine formula antar simpul.
def matrixJarak(arr, loc):
    matrix = [] 
    starting = int(arr[0][0])
    for i in range(starting+1, len(arr)):
        temp = []
        for j in range(len(loc)):
            temp.append(jarak(float(loc[i-(starting+1)][0]), float(loc[i-(starting+1)][1]), float(loc[j][0]), float(loc[j][1])))
        matrix.append(temp)
    return matrix

# Membaca matrix ketetanggan, mengembalikan tetangga dari suatu node 
def getNeighbour(arrNeigh, node):
    matrix = []
    for elmt in arrNeigh:
        if elmt[0] == node:
            matrix.append(elmt[1]) 
            #mengappend tetangga dari node yang ada di input
            #berdasarkan array ketetanggaan
    return matrix

# Menerima sebuah array dari listnode, kemudian mencari dan mengembalikan
# indeks dari node yang dicari
def getIdx(array, node):
    i = 0
    found = False
    while(found == False and i < len(array)):
        if (array[i] == node):
            found = True
        else:
            i += 1
    if (found == True):
        return i
    else:
        return -1 #mengembalikan -1 apabila node tidak ditemukan

# Mengurutkan list tuple yang berisi node asal, node tujuan, berdasarkan jarak antara keduanya
def sortingFn(fnCandidate):
    # algoritma selection short
    for i in range(len(fnCandidate)):
        min_idx = i
        for j in range(i+1, len(fnCandidate)):
            if float(fnCandidate[min_idx][1]) > float(fnCandidate[j][1]):
                min_idx = j    
        fnCandidate[i], fnCandidate[min_idx] = fnCandidate[min_idx], fnCandidate[i]
    return fnCandidate

# Mencari jalur terpendek dari node asal ke node tujuan #
def closestPath(srcNode, destNode, arrNeigh, Distance, listNode):
    candidate = []
    candidateNode = [srcNode]
    visited = []
    destIdx = getIdx(listNode, destNode) #index node yang dituju
    if (srcNode == destNode):
        return [srcNode, 0]
    else :
        currentNode = srcNode
        predSrc = 0
        first = True
        while (len(candidate) > 0 or first == True):
            first = False
            currNeighbour = getNeighbour(arrNeigh, currentNode)
            for node in currNeighbour:
                if (node not in candidateNode):
                    pred = currentNode #menyimpan prenode
                    currentCheck = node
                    predIdx = getIdx(listNode,pred) #indeks prenode
                    idx = getIdx(listNode, currentCheck) #indeks node yang sedang di cek
                    srcToN = predSrc + float(Distance[idx][predIdx]) #gn
                    nToDest = float(Distance[idx][destIdx]) #hn
                    temp = srcToN + nToDest #fn
                    candidate.append((currentCheck, temp, srcToN, currentNode)) 
            candidate = sortingFn(candidate) #sorting list candidate berdasarkan fn
            #memastikan untuk tidak berenti iterasi ketika terdapat kasus dimana len(candidate) = 1 dan perlu dipop,
            #namun masih terdapat tetangga yang harus diiterasi dari current sehingga masih memenuhi syarat while
            if  (len(getNeighbour(arrNeigh, currentNode)) > 0 and len(candidate) == 1):
                candidate.append(('',9999999999,0,'')) 
            a = candidate.pop(0) #pop elemen pertama hasil sorting
            visited.append((a[3],a[0],a[1],a[2])) #append prenode,currnode,fn,gn
            candidateNode.append(a[0])
            currentNode = a[0]
            predSrc = float(a[2])
        finalMove = getMinFn(destNode, visited)
        if (str(finalMove[1]) == str(destNode)):
            path = derivate(destNode,srcNode,visited)
            return path
        else:
            print("jalur tidak ditemukan")
            return []

# Mencari node tujuan dari list tuple visited(yang sudah dikunjungi) berdasarkan 
# jarak terpendek mengembalikan 1 elemen dari visited 
def getMinFn(destNode,visited):
    min = 999999999
    result = visited[0]
    for i in range (len(visited)):
        if (min > float(visited[i][2]) and visited[i][1] == destNode):
            min = float(visited[i][2])
            result = visited[i]
    return result

# menerima input destination dan sourcenode, serta visited, kemudian menelusuri
# path dari destination node ke source node, dan mengembalikan list of tupple
# yang berisi node, dan jarak yang ditempuh dari src node 
def derivate(destNode,srcNode,visited):
    path = []
    nodeBacktrack = destNode
    destTuple = getMinFn(destNode, visited) #append terakhir
    found = False
    while (found == False):
        for i in range(len(visited)):
            if (nodeBacktrack == visited[i][1]): 
                path.append((destTuple[1],destTuple[3]))  
                nodeBacktrack = destTuple[0] #backtrack mundur
                destNode = destTuple[0]
                if(destTuple[0] == srcNode):
                    if(srcNode not in path):
                        path.append((srcNode, 0))
                    found = True #berhenti loop
                destTuple = getMinFn(destNode, visited)
    path.reverse() #reverse list hasil append
    return path