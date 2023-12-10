#include <stdio.h>

int main()
{   
    int a[] = { 1 , 0 , 1  , 0 , 1 , 1 };
    
    int somma = 0 ;
    for (int i = 0 ; i < 6 ; i ++)
        somma = somma + a[i] ;
    printf( "%d" , somma  );
     
}
