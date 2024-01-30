#include <stdio.h>

void fun ( int  n ){
    n= 4;
}

void funpun ( int* n ){
    *n= 4;
}


int main()
{
    int a=3;
    fun (a) ;
    printf("%d\n" , a );
    
    int n=7 ;
    fun (n) ;
    printf("%d\n" , n );

    a=3;
    funpun ( &a ) ;
    printf("%d\n" , a );
    
    n=7 ;
    funpun ( &n ) ;
    printf("%d\n" , n );
}
