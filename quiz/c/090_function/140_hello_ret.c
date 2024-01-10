#include <stdio.h>

int doppio_di (int n )
{
    return 2*n ;
}


int main()
{
    printf("%d\n", doppio_di(doppio_di(3)));

}