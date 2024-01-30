#include <stdio.h>

int main()
{
    int  a = 3;
    int  b = 5;
    
    int* p;
    
    if (a < b )
        p= &a;
    else
        p= &b;
    
    printf("%d" , *p );

}
