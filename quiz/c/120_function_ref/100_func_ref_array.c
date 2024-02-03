#include <stdio.h>

void inc( int a[] )
{
    a[0] ++ ;
    a[1] ++ ;
    a[2] ++ ;
}

int main()
{
    int v[] = { 10, 11, 12 };
    printf("%d %d %d\n" , v[0] , v[1] , v[2]);
    inc( v );
    printf("%d %d %d\n" , v[0] , v[1] , v[2]);

}
