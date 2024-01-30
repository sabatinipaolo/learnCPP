#include <stdio.h>

int main()
{
    int a [] = { 2,4,6,8,10 };
    
    int* p = a;   // perché non  int* p = &a  ???
    
    
    printf ("%d %d\n" , *p++ , a[0] ) ;
    printf ("%d %d\n" , *p   , a[1] ) ;
    printf ("%d %d\n" , *++p , a[2] ) ;
    printf ("%d %d\n" , *p   , a[2] ) ;
    

}
