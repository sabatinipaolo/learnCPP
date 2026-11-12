#include <stdio.h>

int main()
{
    int a;
    int c=5;


    a=1;
    while (a <= c){
        printf("*");
        a=a+1;
    }
    printf("\n");

    a=1;
    while (a <= c+3){
        printf("*");
        a=a+1;
    }
    printf("\n");

}