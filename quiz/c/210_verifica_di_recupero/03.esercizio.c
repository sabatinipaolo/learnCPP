#include <stdio.h>

void stampa(int n, char carattere)
{
    for (int i= 1 ; i<= n ; i++)
        printf("%c", carattere);
}

void scacchi ( int n )
{
    for( int i=1 ; i<= n ; i++){
        stampa(n,'*'); stampa(n,' ');
        printf("\n");
    }

    for (int i=1 ; i<= n ; i++){
        stampa(n,' '); stampa(n,'*');
        printf("\n");
    }
}

int main()
{
    scacchi(5);
}
