#include <stdio.h>

int main()
{
    int a[] = { 2 , 0 , 3 , 1 , 8 , 1 };
    int b[] = { 1 , 3 , 5 , 0 , 2 , 4  } ;
  
    for (int i = 0 ; i < 6 ; i ++)
        printf( "%d " , a[ b[i] ] );
     
}
