#include <stdio.h>


int main()
{   int x, y ;

    x = 1; y = 0;

    x = y++;

    printf( "x=%d y=%d\n", x , y);

    x = 1; y = 0;

    x = ++y ;

    printf( "x=%d y=%d\n", x , y);

}
