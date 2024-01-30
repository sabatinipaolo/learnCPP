#include <stdio.h>

int main()
{
    int a [] = { 2,4,6,8,10 };
    
    int* p = a;   // perché non  int* p = &a  ???
    
    printf ("%d %d\n" , *p , a[0] ) ;
   
    p = &a[3] ;
    printf ("%d %d\n" , *p , a[3] ) ;

    p = &a[1] ;
    printf ("%d %d\n" , *p , a[1] ) ;

   

}
