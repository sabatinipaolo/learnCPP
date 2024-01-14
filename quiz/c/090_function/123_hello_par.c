#include <stdio.h>

void stampa (int n )
{
    for (int i = 0 ; < n ; i++ )
        printf("*" );
}


int main()
{
    stampa ( 4 );
    printf( "\n" );
    stampa ( 3 );
}
