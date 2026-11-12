#include <stdio.h>

int main()
{
    int a=1;
    int b=2;
    int s=0;
    while (a <= 3){
        s=s+b;
        a=a+1;
    }
    printf("%d", s);
}