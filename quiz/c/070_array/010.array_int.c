#include <stdio.h>

int main()
{   
    int a[3] ;
    
    a[0] = 5 ; 
    a[1] = 7 ;
    a[2] = a[0] + 1 ;
    
    printf( "%d\n" , a[0] ); 
    printf( "%d\n" , a[1] ); 
    printf( "%d\n" , a[2] );
     
}
