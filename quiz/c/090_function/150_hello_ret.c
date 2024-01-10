#include <stdio.h>

int doppio_di (int n )
{
    return 2*n ;
}


int main()
{
    int x = doppio_di(3);
    int y = doppio_di(x);

    printf("%d %d\n", x , y );

}