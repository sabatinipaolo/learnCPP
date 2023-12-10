#include <stdio.h>

int main()
{   
    int a[] = { 1 , 0 , 1  , 0 , 1 , 1 };
    
    int conta = 0 ;
    for (int i = 0 ; i < 6 ; i ++)
        if ( a[i] == 0 ) conta++ ;
    printf( "%d" , conta  );
     
}
