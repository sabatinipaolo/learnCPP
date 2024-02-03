#include <stdio.h>

void modifica( int a )
{
    a = 3; 
}

int main()
{
    int a = 5;
    modifica( a );
    printf("%d\n" , a );
     
}
