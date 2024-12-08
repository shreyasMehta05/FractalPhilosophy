# 1.1 Input Format
# • The first line contains T , the number of test cases.
# • For each test case:
# – The first line contains four space-separated integers N , M , S, and X, representing the
# number of states, number of relevant transitions in the DFA, starting state, and size of
# input, respectively.
# – The following M lines each contain two space-separated integers ai and bi, indicating that
# the DFA transitions from state ai to state bi after outputting ai upon reading a character.
# All other transitions in the DFA are considered irrelevant as those states are dead.
# 1.2 Output Format
# For each test case, output N space-separated integers where the i-th integer represents the frequency
# of the number i output by the PRNG.
def takeInput():
    n,m,s,x = map(int,input().split())
    transitions = dict()
    for _ in range(0,m):
        a,b = map(int,input().split())
        transitions[a] = b # a -> b
    return n,m,s,x,transitions

def getCycle(n,m,s,x,transitions,s1): # s1 is the starting point of the cycle
    s2 = s1
    cycle = [-1]*(n+1)
    cycleLength = 0
    while s2 in transitions:
        cycle[cycleLength] = s2
        cycleLength += 1
        s2 = transitions[s2]
        if s2 == s1: break
    # print(cycle)
    return cycle,cycleLength
def getInitial(n,m,s,x,transitions,s1): # s1 is the starting point of the cycle
    initial = [-1]*(n+1)
    initialLength = 0
    while s in transitions:
        if s == s1: break
        initial[initialLength] = s
        initialLength += 1
        s = transitions[s]
    # print(initial)
    return initial,initialLength
def compute(n,m,s,x,transitions):
    s1 = s
    visited = [False]*(n+1)
    while s1 in transitions:
        if visited[s1]: break
        visited[s1] = True
        s1 = transitions[s1]
    cycle,cycleLength=getCycle(n,m,s,x,transitions,s1)
    initial,initialLength=getInitial(n,m,s,x,transitions,s1)
    freq=ouput(n,x,initial,initialLength,cycle,cycleLength)
    printOutput(freq)
def ouput(n,x,initial,initialLength,cycle,cycleLength):
    freq = [0]*(n+1)
    # if x is less than or equal to initialStr
    if x<=initialLength:
        for i in range(0,x):
            freq[initial[i]] += 1
        return freq
    # (initial).(cycle)*(x-initial)//cycleLength.(cycle:[0:x%cycleLength])
    # initial
    for i in range(0,initialLength):
        freq[initial[i]] += 1
    # cycle*(x-initial)//cycleLength
    x -= initialLength
    freqOfCycle = [0]*(n+1)
    for i in range(0,cycleLength):
        freqOfCycle[cycle[i]] += 1
    totalCycle = 0
    totalCycle+= x//cycleLength
    # cycle:[0:x%cycleLength] length = x%cycleLength
    x = x%cycleLength
    for i in range(0,x):
        freq[cycle[i]] += 1
    for i in range(1,n+1):
        freq[i] += totalCycle*freqOfCycle[i]
    return freq  
def getOutputNaive(n,m,s,x,transitions):
    freq = [0]*(n+1)
    for i in range(0,x):
        # transitions does not exist
        if s not in transitions:
            break
        freq[s] += 1
        s = transitions[s]
    return freq
def printOutput(freq):
    for i in freq[1:]:
        print(i,end=" ")
    print()

if __name__ == '__main__':
    y = int(input())
    for _ in range(0,y):
        n,m,s,x,transitions = takeInput()
        compute(n,m,s,x,transitions)
        
        # freq = getOutputNaive(n,m,s,x,transitions)
        # printOutput(freq) 
# Time Complexity: O(n+m)