#include <stdio.h>

void funz( int a[] , int b )
{
    a[0] = 0; 
    b = 0; 
}

int main()
{
    int v[] = { 10, 11, 12 };
    int c= 99; 
    
    printf("%d %d\n" , v[0] , c );
    funz( v , c );
    printf("%d %d\n" , v[0] , c );

}
