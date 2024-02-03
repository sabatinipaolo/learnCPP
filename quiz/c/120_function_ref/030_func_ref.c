#include <stdio.h>

void funz( int* a , int b )
{
    *a = 3; 
    b= 8; 
}

int main()
{
    int a=5 ,b = 5;
    funz( &a , b);
    printf("%d %d\n" , a , b );
    
    //funz( &a , 3 );
}
