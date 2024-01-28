#include <stdio.h>

int a=4;
int b=1;


void funz( int a )
{   
    int c=9 ;
    int x=0 ;
    printf("%d %d %d\n", a , b ,c );
    printf("%d\n" , x );
}


int main()
{
    int a = 1 ;

    funz( 2 );
    
    printf("\n");
    printf("%d %d\n", a , b );
    //printf("%d" , c );
    //printf("%d" , x );
}

