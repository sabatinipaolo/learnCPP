#include <stdio.h>

void stampa_asterischi(int n)
{
    for (int i= 1 ; i<= n ; i++)
        printf("*");
}

void rettangolo ( int numero_righe, int numero_colonne)
{
    for (int i=1; i<= numero_righe; i++ )
    {
        stampa_asterischi(numero_colonne);
        printf("\n");
    }
}

void forma ( int n )
{
    rettangolo( n , n);
    rettangolo( n , 2*n );
}

int main()
{
    forma(6);
}
