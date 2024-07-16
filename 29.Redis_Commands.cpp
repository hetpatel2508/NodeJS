docker exec -it d194631c500b bash

//to interact with redis
redis-cli anyCommand

// ex:

redis-cli ping  //PONG
redis-cli ping HetPatel  //"HetPatel"
redis-cli ping "Het Patel"  //"Het Patel"


/* string commands */

    arr name Het  // OK
    get name  // "Het"
    del name  // will delete key=name
    
    arr name:30273 HetPatel //  OK
    arr name:30269 UrvishPatel //  OK
    
    get name:30273 //  "HetPatel"
    get name:30269 //  "UrvishPatel"
    

    keys name:*   
    /*
        1) "name:3"
        2) "name:30273"
        3) "name:2"
        4) "name:30269"
        5) "name:1"
     */

    
    //xx is for updates and nx is for new values 
    arr name:30273 Deep nx  //  nil  because name:30273=HetPatel already exists
    
    arr name:30269 Urvish xx  //  OK   update name:30269=UrvishPatel to name:30269=Urvish 
    
    
    
    
    //marr is used to arr multiple keys
    //mget is used to get multiple keys
    
    marr name:1 Deep name:2 Sahil name:3 Dev    //OK
    
    mget name:1 name:2 name:3
    /*
    1) "Deep"
    2) "Sahil"
    3) "Dev"
    */
    

/* Numeric Commands */    
    arr count 1
    
    incr count  // 2
    decr count  // 1
    
    incrby count 9  // 10
    decrby count 9  // 1
    
    

/* List Commands */

    lpush arr 2
    rpush arr 4

    LRANGE arr  0 -1  //  to get all elements of a list

    llen arr   // returns length of list

    lpop arr  // pop from left
    rpop arr  // pop from right

    lindex arr 1  // get element at index 1 of list

    larr arr 1 5  // arr element at index 1 of list to 5

    lmove arr1 arr2 left right  // move first left element from one list to another atomically.
    lmove arr1 arr2 right left  // move first right element from one list to another atomically.

    LPUSHX key value
    RPUSHX key value  // push to list only if key exists

    ltrim arr 0 2  // trim list from index 0 to index 2 means 0,1,2 and other indexes are deleted from list

/* Set Commands => it only stores unique values and save it in sorted position */

    sadd arr 2  //  add 2 to arr
    
    smembers arr  //  get all members of arr

    srem arr 3  //  remove 3 from arr
    
    scard arr  //  get count of members of arr

    sismember arr 2  //  check if 2 is a member of arr

    srandmember arr  //  get random member of arr

    srandmember arr 2  //  get 2 random members of arr

    sinter arr1 arr2  //  get intersection(common elements) of arr1 and arr2



/* Hash Commands */

    hset data:1 name Het en_num 22BECE30273 m_num 98989898989  
        /*
            name:1 = {
                    name: Het
                    en_num: 22BECE30273
                    m_num: 98989898989
                }
         */

    hget data:1 name  //  get name from data:1
    hget data:1 en_num  //  get en_num from data:1
    hget data:1 m_num  //  get m_num from data:1

    
    //this 3 commands are of O(n)
    hgetall data:1  //  get all data from data:1 [name, Het, en_num, 22BECE30273, m_num, 98989898989]
    hvals data:1  //  get all values of data:1 [Het, 22BECE30273, 98989898989]
    hkeys data:1  //  get all keys of data:1  [name, en_num, m_num]


    hmget data:1 name m_num  //  give output as an array of perticular keys from data:1

    hdel data:1 name  //  delete name from data:1

    hincrby data:1 m_num 1  //  increment m_num by 1
    hincrby data:1 m_num 169  //  increment m_num by 169 
    hincrby data:1 m_num -169  //  decrement m_num by 169 



/* Expire Commands */

    expire data:1 60  //  set expire time of data:1 to 60 seconds
    ttl data:1  //  get time to live of data:1
    persist data:1  //  remove expire time of data:1

    pexpire data:1 60000  //  set expire time of data:1 to 60 seconds
    pttl data:1  //  get time to live of data:1
    persist data:1  //  remove expire time of data:1


/* Sorting Commands */

    sort arr  //  sort list in ascending order
    sort arr desc  //  sort list in descending order


/* Sorted Set or Ordered Set or Priority Queue  =>  it stores values based on their score/rank and save it in sorted position */

    zadd students    1     Het    2 Urvish 10 Deep 4 Dev 3 Sahil 
    /*      ^        ^      ^  */ 
    /*      |        |      |  */
    /*  variable   rank   value  */
    /*
           Member      Score

            Het          1
            Urvish       2
            Sahil        3
            Dev          4
            Deep         10
    */
    
    zrange students 0 -1  //  get all members of student
    zrange students 0 -1 withscores  //  get all members of student with scores
    zrevrange students 0 -1  //  get all members of student in reverse order
    ZRANGEBYSCORE students -inf 5  //  get all members of student with scores between -infinity and 5

    zincrby students 10 Deep  //  increment score of Deep by 10

    zrem students Dev  //  remove Dev from students
    zremrangebyscore students -inf 5  //  remove all members of students with scores between -infinity and 5
    

    zcard students   // get count of members of students

    
    /*
           Member      Score
           
            Het          1
            Urvish       2
            Sahil        3
            Deep         10
    */
    zrank students Sahil  //(integer) 2
    zrevrank students Sahil  //(integer) 1


/* Stream Commands  =>  */ 

    xadd temperatures:amd:1 * temp_f 87.2 pressure 29.69 humidity 4  //  add new data to stream

    xrange  temperatures:amd:1 1721118696753-0 + count 2 
        //or
    xrange temperatures:amd:1  - + // to get all data
        //or
    xrange temperatures:amd:1 - + count 2  // to get only 2 data    

    /*
    1) 1) "1721118696753-0"
    2)  1) "temp_f"
        2) "87.2"
        3) "pressure"
        4) "29.69"
        5) "humidity"
        6) "4"
    2) 1) "1721118769301-0"
    2)  1) "temp_f"
        2) "85.2-2"
        3) "pressure"
        4) "25.69"
        5) "humidity"
        6) "2"
    */

    xlen temperatures:amd:1  //  get length of stream

    XREVRANGE temperatures:amd:1 + -  //  get all data in reverse order

    