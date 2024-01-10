#include <stdio.h>

int doppio_di (int n )
{
    return 2*n ;
}


int main()
{
    printf("%d\n", doppio_di(2));

    int x=doppio_di(7);
    printf("%d\n" , x);
}