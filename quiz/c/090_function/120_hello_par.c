#include <stdio.h>

void stampa_il_doppio_di (int n )
{
    printf("%d\n", 2*n );
}


int main()
{
    stampa_il_doppio_di(2);
    stampa_il_doppio_di(3);
    int x=6;
    stampa_il_doppio_di(x);
}