#include <stdio.h>

int main()
{
    int a=1;
    int s=0;
    while (a <= 3){
        s=s+a;
        a=a+1;
    }
    printf("%d", s);
}