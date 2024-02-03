#include <stdio.h>

void modifica( int* a )
{
    *a = 3; 
}

int main()
{
    int b = 5;
    modifica( &b );
    printf("%d\n" , b );
     
}
