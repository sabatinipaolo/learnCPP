#include <stdio.h>

int main()
{
    int a [] = { 2,4,6,8,10 };
    
    int* p = a;   // perché non  int* p = &a  ???
    
    printf ("%d\n" , *p ) ;
    
    p++ ;
    //a++ ; 
    
    printf ("%d\n" , *p ) ;
    
    p = p + 3; 
    
    printf ("%d\n" , *p ) ;

}
