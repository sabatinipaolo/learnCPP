#include <stdio.h>
int main()
{
    int v[] = { 10, 11, 12 };
    int* a;

    printf("%d %d %d\n" , v[0] , v[1] , v[2]);
    
    a=v;    // v è un indirizzo !!

    printf("%d %d %d\n" , a[0] , a[1] , a[2]);
    
    *a = 0;
    
    a[1] =1;
    
    v[2]=2;
    
    printf("%d %d %d\n" , v[0] , v[1] , v[2]);
    
    printf("%d %d %d\n" , a[0] , a[1] , a[2]);
}
