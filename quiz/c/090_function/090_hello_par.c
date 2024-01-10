#include <stdio.h>

void scrive_ciao(int n)
{
    printf("%d\n", n);
    for (int i= 1 ; i<= n ; i++)
        printf("ciao\n");
}


int main()
{
    scrive_ciao(2);
}