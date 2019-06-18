//Q1. Write a function that takes a string as input and returns the string reversed.

/**
 * @param  {} string
 */
function reverseString1(string){
    return string.split("").reverse().join("");
}
/**
 * @param {character[]} s
 */
var reverseString2 = function(s) {
    var mid = s.length % 2 === 0 ? s.length/2 : (s.length+1)/2;
    for(var i=0;i<mid;i++){
        var temp = s[i];
        s[i] = s[s.length-1-i];
        s[s.length-1-i] = temp;
    }
    return s;
};

//Q2. Given a positive integer num, write a function which returns True if num is a perfect square else False.
var isPerfectSquare = function(number) {
    for(var i=0;i<=number;i++){
        if(i*i>number) return false;
        if((i*i) === number) return true;
    }
    return false;
};


//Q3. Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary)
var insert = function(intervals, newInterval) {
    var result = [];
    if(intervals.length === 0){
        result.push(newInterval);
        return result;
    }
    if(newInterval.length === 0) return intervals;
    
    var index = 0;
    intervals.forEach((interval)=>{
       if(interval[1] < newInterval[0]){
           result.push(interval);
           index++;
       }else if(interval[0] > newInterval[1]){
           result.push(interval);
       }else{
           newInterval[0] = Math.min(interval[0], newInterval[0]);
           newInterval[1] = Math.max(interval[1], newInterval[1]);
       }
    });
    
    result.splice(index,0,newInterval);
    
    return result;
};


//Q4. Given a 2D board and a word, find if the word exists in the grid.
var exist = function(board, word) {
    for(var i=0;i<board.length;i++){
        for(var j=0;j<board[i].length;j++){
            if(board[i][j] === word[0]){
                if(traversalBoard(board,i,j,word,0)) return true;
            }
        }
    }
    return false;
};

function traversalBoard(board,x,y,word,wordIndex){
    if(wordIndex === word.length) return true;
    if(x<0 || y<0 || x>board.length-1 || y>board[x].length-1 || board[x][y]==='') return false;
    if(board[x][y] != word[wordIndex]) return false;
    if(board[x][y] === word[wordIndex]){
        var temp = board[x][y];
        var result = false;
        board[x][y] = '';
        if(traversalBoard(board,x-1,y,word,wordIndex+1) ||
           traversalBoard(board,x+1,y,word,wordIndex+1) ||
           traversalBoard(board,x,y-1,word,wordIndex+1) ||
           traversalBoard(board,x,y+1,word,wordIndex+1)) result = true;
        board[x][y] = temp;
        return result;
    }
}


//Q5. Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.
var getSum = function(a, b) {
    while(b!=0){
        var carry = (a&b)<<1;
        a = a^b;
        b = carry;
    }
    return a;
};