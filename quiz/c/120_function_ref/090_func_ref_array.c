#include <stdio.h>

void funz( int a[] , int b )
{
    *a = 0; 
    a[1] = 1 ;
    a++ ;
    a[1] = 2;
    b = 0; 
}

int main()
{
    int v[] = { 10, 11, 12 };
    int c= 99; 
    
    printf("%d %d %d %d\n" , v[0] , v[1] , v[2], c );
    funz( v , c );
    printf("%d %d %d %d\n" , v[0] , v[1] , v[2], c );

}
