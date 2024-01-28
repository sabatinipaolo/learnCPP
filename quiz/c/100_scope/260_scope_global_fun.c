#include <stdio.h>

int a=4;
int b=1;


void funz( int a )
{   
    printf("%d %d\n", a , b );
    b=5 ;
}


int main()
{
    printf("%d %d\n", a , b );
    
    funz( 2 );

    printf("%d %d\n", a , b );
    //printf("%d" , c );
    //printf("%d" , x );
}

