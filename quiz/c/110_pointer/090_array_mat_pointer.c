#include <stdio.h>

int main()
{
    int a [] = { 2,4,6,8,10 };
    
    int* p = a;   // perché non  int* p = &a  ???
    int* altrop = p ;
    
    
    printf ("%d %d\n" , *p , *altrop ) ;
   
    p = p + 4 ;
    printf ("%d %d\n" , *p , *altrop ) ;


    printf ("%ld\n"  , p - altrop  ) ; // %ld ??


}
