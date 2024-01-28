#include <stdio.h>
void funz( int a , int b )
{   
    int c=9 ;
    int x=0 ;
    printf("%d %d %d\n", a , b ,c );
    printf("%d\n" , x );
}


int main()
{
    int a = 1 ;
    int b = 4 ;
    int c = 3 ;
    
    funz( 1 , 1 );
    
    printf("\n");
    printf("%d %d %d \n", a , b ,c );
    
    
    //printf("%d" , x );
}

