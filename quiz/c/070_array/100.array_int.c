#include <stdio.h>

int main()
{
    int a[] = { 2 , 4 , 0 , 1 , 8 , 1 };

    int i= 0 ;
    while ( a[i] != 0 ) {
        printf( "%d " , a[i] );
        i++;
    }

}
