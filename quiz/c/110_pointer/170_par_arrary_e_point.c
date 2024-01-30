#include <stdio.h>


void funz ( int v [] , int n ){
    v[0] = 0;
    v[1] = 0; 
    n = 0;
}


int main()
{   
    int a [] = { 2,4,6,8,10 } ;
    int n = 3;
    
    funz ( a , n );
    
    printf("%d %d %d" , a[0] , a[1] , n );

    
}
