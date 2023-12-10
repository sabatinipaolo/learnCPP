#include <stdio.h>

int main()
{   
    int a[] = { 2 , 0 , 3 , 1 , 8 , 1 };
    int b[] = { 1 , 0 , 1 , 1 , 0 , 1 } ;
    
    int somma = 0 ;
    
    for (int i = 0 ; i < 6 ; i ++)
        if (b[i] == 1 ) somma = somma +a[i];
    
    printf( "%d" , somma );
     
}
